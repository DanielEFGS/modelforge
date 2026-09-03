import { expect, test } from '@playwright/test';

test('never places private source content on the network', async ({ page }) => {
  const sentinel = 'MODEL_FORGE_PRIVATE_SENTINEL_92741';
  const leaks: string[] = [];
  page.on('request', (request) => {
    const serialized = JSON.stringify({
      url: request.url(),
      body: request.postData(),
      headers: request.headers(),
    });
    if (serialized.includes(sentinel)) leaks.push(serialized);
  });
  await page.goto('/json-to-typescript');
  await expect(page.getByRole('button', { name: 'Generate' })).toBeEnabled();
  await page
    .getByRole('textbox', { name: 'JSON source editor' })
    .fill(`{"private":"${sentinel}"}`);
  await page.getByRole('button', { name: 'Generate' }).click();
  await expect(page.getByText(/private: string/)).toBeVisible();
  expect(leaks).toEqual([]);
});

test('supports a keyboard-only generation path with labeled controls', async ({
  page,
}) => {
  await page.goto('/json-to-java');
  await expect(page.getByRole('combobox', { name: 'Target' })).toHaveValue(
    'java',
  );
  await expect(
    page.getByRole('textbox', { name: 'JSON source editor' }),
  ).toBeVisible();
  const generate = page.getByRole('button', { name: 'Generate' });
  await generate.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('tab', { name: 'User.java' })).toBeVisible();
});

test('inherits the browser theme until the user persists a choice', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).not.toHaveClass(/app-booting/);

  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Use dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(
    await page.evaluate(() => localStorage.getItem('modelforge-theme')),
  ).toBe('dark');

  await page.emulateMedia({ colorScheme: 'light' });
  await page.reload();
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('publishes crawl controls and supported routes only', async ({
  request,
}) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Sitemap:');
  for (const route of [
    '/json-to-typescript',
    '/json-to-java',
    '/json-to-spring-boot',
    '/json-to-csharp',
    '/json-to-python',
  ]) {
    expect((await request.get(route)).ok()).toBe(true);
  }
});

test('ships no advertising integration at all', async ({ request }) => {
  const home = await (await request.get('/')).text();
  expect(home).not.toContain('google-adsense-account');
  expect(home).not.toContain('ca-pub-');
  expect(home).not.toContain('pagead2.googlesyndication.com');
  expect(home).not.toContain('adsbygoogle');

  const ads = await request.get('/ads.txt');
  expect(ads.status()).toBe(404);
});

test('localizes every legal document from the saved interface language', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('modelforge-locale', 'es'),
  );
  const documents = [
    ['/privacy', 'Política de privacidad'],
    ['/cookies', 'Cookies y almacenamiento local'],
    ['/terms', 'Términos de uso'],
    ['/generated-code-disclaimer', 'Aviso sobre el código generado'],
  ] as const;

  for (const [route, title] of documents) {
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.locator('.legal')).toContainText(
      'Política provisional del MVP',
    );
  }
});

test('traces field references across source, model, and generated output', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );
  await expect(page.locator('.source-reference')).not.toHaveCount(0);
  await expect(page.locator('.reference-route')).not.toHaveCount(0);
  const references = page.getByRole('switch', { name: 'REFERENCES' });
  await expect(references).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('.reference-route.is-visible')).not.toHaveCount(0);
  expect(
    await page
      .locator('.reference-route path')
      .first()
      .evaluate((path) => getComputedStyle(path).transitionDuration),
  ).not.toBe('0s');
  await references.click();
  await expect(references).toHaveAttribute('aria-checked', 'false');
  await expect(page.locator('.reference-route.is-visible')).toHaveCount(0);
  await expect(page.locator('.reference-route.is-hidden')).not.toHaveCount(0);

  await references.click();
  await expect(references).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('.reference-route.is-visible')).not.toHaveCount(0);
  await references.click();

  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(
    Number.parseFloat(
      await page
        .locator('.reference-route path')
        .first()
        .evaluate((path) => getComputedStyle(path).transitionDuration),
    ),
  ).toBeLessThan(0.001);

  const pin = page.getByRole('button', {
    name: 'Pin reference User.emailAddress',
  });
  await pin.click();
  await expect(pin).toHaveAttribute('aria-pressed', 'true');
  await expect(pin).toHaveAttribute(
    'title',
    'Unpin reference User.emailAddress',
  );
  await pin.hover();
  expect(
    await pin.evaluate((element) => {
      const styles = getComputedStyle(element);
      return styles.color !== styles.backgroundColor;
    }),
  ).toBe(true);
  await expect(page.locator('.reference-route.active')).toHaveCount(1);
  await expect(page.locator('.reference-readout')).toContainText(
    'email_address → User.emailAddress · PINNED',
  );

  await page.getByRole('button', { name: 'Generate' }).click();
  const generatedProperty = page.getByRole('button', {
    name: 'Trace generated property User.emailAddress',
  });
  await expect(generatedProperty).toBeVisible();
  await generatedProperty.hover();
  await expect(page.locator('.reference-route.active')).toHaveCount(1);
});

test('reveals every diagnostic and highlights generated syntax', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );

  const diagnosticSummary = page.locator('.diagnostic-panel > summary');
  await expect(diagnosticSummary).toContainText('4 diagnostics');
  await diagnosticSummary.click();
  const diagnostics = page.getByRole('list', {
    name: 'Inference diagnostics',
  });
  await expect(diagnostics).toBeVisible();
  await expect(diagnostics.getByRole('listitem')).toHaveCount(4);
  await expect(diagnostics).toContainText(
    'The property name was normalized for the target. "created_at" → "createdAt"',
  );

  await page.getByRole('button', { name: 'Generate' }).click();
  const keyword = page.locator('.syntax-keyword').filter({ hasText: 'export' });
  const property = page.locator('.syntax-property').filter({
    hasText: 'emailAddress',
  });
  await expect(keyword).not.toHaveCount(0);
  await expect(property).not.toHaveCount(0);
});

test('persists interface language without translating generated code', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );

  await page.locator('.locale-control select').selectOption('es');
  await expect(page.getByRole('button', { name: 'Generar' })).toBeVisible();
  await expect(page.locator('.local-only')).toContainText('Solo local');
  await expect(page.locator('.site-footer')).toContainText(
    'Generación determinista de código',
  );
  await expect(page.locator('.diagnostic-panel')).toContainText(
    'El nombre de la propiedad se normalizó para el destino.',
  );
  await expect(page.locator('.landing-content')).toContainText(
    'Cómo ModelForge compila JSON',
  );
  await expect(page.locator('.landing-content')).toContainText(
    'Preguntas frecuentes',
  );
  await expect(
    page.locator('.related[aria-label="Conversores relacionados"]'),
  ).toBeVisible();
  await expect(page.locator('.landing-content')).not.toContainText(
    'Common questions',
  );
  await expect(page.getByRole('option', { name: 'Interfaz' })).toBeAttached();
  await expect(
    page.getByRole('textbox', {
      name: 'Nombre generado para email_address',
    }),
  ).toHaveValue('emailAddress');
  await page.getByRole('button', { name: 'Generar' }).click();
  await expect(page.getByLabel('Código generado')).toContainText(
    'export interface User',
  );

  await page.reload();
  await expect(
    page.getByRole('combobox', { name: 'Idioma de la interfaz' }),
  ).toHaveValue('es');
  await expect(page.getByRole('button', { name: 'Generar' })).toBeVisible();
});

test('keeps target guidance current and prevents incompatible Spring options', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );

  const info = page.locator('.target-info');
  await expect(info).toContainText('Generate interfaces');
  await page.getByRole('combobox', { name: 'Target' }).selectOption('spring');
  await expect(info).toContainText('JPA entities');

  const family = page.getByRole('combobox', { name: 'Spring Boot family' });
  const java = page.getByRole('combobox', { name: 'Java version' });
  await java.selectOption('26');
  await family.selectOption('3.5');
  await expect(java).toHaveValue('21');
  await expect(java.locator('option[value="11"]')).toBeDisabled();
  await expect(java.locator('option[value="26"]')).toBeDisabled();

  await page
    .getByRole('button', { name: 'Dismiss target information' })
    .click();
  await expect(info).toHaveCount(0);
});

test('paints expanded diagnostics above reference routes', async ({ page }) => {
  await page.goto('/');
  const details = page.locator('.diagnostic-panel');
  await details.locator('summary').click();
  const [modelZ, overlayZ] = await Promise.all([
    page
      .locator('.model-panel')
      .evaluate((node) => Number.parseInt(getComputedStyle(node).zIndex, 10)),
    page
      .locator('.reference-overlay')
      .evaluate((node) => Number.parseInt(getComputedStyle(node).zIndex, 10)),
  ]);
  expect(modelZ).toBeGreaterThan(overlayZ);
});

test('keeps target inputs stable when source names are very long', async ({
  page,
}) => {
  const longSourceName = `source_${'extremely_long_'.repeat(12)}field`;
  await page.goto('/');
  await page
    .getByRole('textbox', { name: 'JSON source editor' })
    .fill(JSON.stringify({ id: 42, [longSourceName]: 'value' }));

  const shortTarget = page.getByRole('textbox', {
    name: 'Generated name for id',
  });
  const longTarget = page.getByRole('textbox', {
    name: `Generated name for ${longSourceName}`,
  });
  await expect(longTarget).toBeVisible();

  const [shortBox, longBox] = await Promise.all([
    shortTarget.boundingBox(),
    longTarget.boundingBox(),
  ]);
  expect(shortBox).not.toBeNull();
  expect(longBox).not.toBeNull();
  expect(longBox!.width).toBeCloseTo(shortBox!.width, 0);

  const sourceLabel = page.locator('.source-field-name', {
    hasText: longSourceName,
  });
  await expect(sourceLabel).toHaveAttribute('title', longSourceName);
  expect(
    await sourceLabel.evaluate(
      (element) => element.scrollWidth > element.clientWidth,
    ),
  ).toBe(true);
});

test('aligns separate source and target headings with their field columns', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );
  const cards = page.locator('.model-card');
  expect(await cards.count()).toBeGreaterThan(0);
  const firstCard = cards.nth(0);
  const sourceLabels = firstCard.locator('.source-column-label');
  const targetLabels = firstCard.locator('.target-column-label');
  expect(await sourceLabels.count()).toBe(1);
  expect(await targetLabels.count()).toBe(1);
  const sourceNames = firstCard.locator('.source-field-name');
  expect(await sourceNames.count()).toBeGreaterThan(0);
  const targetInput = page.getByRole('textbox', {
    name: 'Generated name for id',
  });
  const [sourceLabel, targetLabel, sourceName, targetField] = await Promise.all(
    [
      sourceLabels.boundingBox(),
      targetLabels.boundingBox(),
      sourceNames.nth(0).boundingBox(),
      targetInput.boundingBox(),
    ],
  );
  expect(sourceLabel).not.toBeNull();
  expect(targetLabel).not.toBeNull();
  expect(sourceName).not.toBeNull();
  expect(targetField).not.toBeNull();
  expect(Math.abs(sourceLabel!.x - sourceName!.x)).toBeLessThan(3);
  expect(Math.abs(targetLabel!.x - targetField!.x)).toBeLessThan(3);
});

test('groups offscreen reference anchors inside each panel viewport', async ({
  page,
}) => {
  const source = Object.fromEntries(
    Array.from({ length: 40 }, (_, index) => [
      `field_${String(index).padStart(2, '0')}`,
      index,
    ]),
  );
  await page.goto('/');
  await page
    .getByRole('textbox', { name: 'JSON source editor' })
    .fill(JSON.stringify(source, null, 2));
  await page.getByRole('button', { name: 'Generate' }).click();

  await Promise.all(
    ['.cm-scroller', '.model-scroll', '.output-code'].map((selector) =>
      page.locator(selector).evaluate((element) => {
        element.scrollTop = element.scrollHeight;
      }),
    ),
  );

  const routeState = () =>
    page.locator('.inspection-grid').evaluate((grid) => {
      const gridBounds = grid.getBoundingClientRect();
      const viewports = {
        source: grid.querySelector('.code-editor'),
        model: grid.querySelector('.model-scroll'),
        output: grid.querySelector('.output-code'),
      };
      const rails = Object.fromEntries(
        Object.entries(viewports).map(([key, viewport]) => {
          const bounds = viewport!.getBoundingClientRect();
          return [
            key,
            {
              top: bounds.top - gridBounds.top + 8,
              bottom: bounds.bottom - gridBounds.top - 8,
            },
          ];
        }),
      );
      const anchors = [...grid.querySelectorAll('[data-route-anchor]')].map(
        (anchor) => ({
          kind: anchor.getAttribute('data-route-anchor')!,
          y: Number(anchor.getAttribute('cy')),
        }),
      );
      return { rails, anchors };
    });

  await expect
    .poll(async () => {
      const { rails, anchors } = await routeState();
      return anchors.every(({ kind, y }) => {
        const rail = rails[kind.startsWith('model') ? 'model' : kind];
        return y >= rail.top && y <= rail.bottom;
      });
    })
    .toBe(true);

  await expect
    .poll(async () => {
      const { rails, anchors } = await routeState();
      return anchors.filter(
        ({ kind, y }) => kind === 'model-left' && y === rails.model.top,
      ).length;
    })
    .toBeGreaterThan(1);
});
