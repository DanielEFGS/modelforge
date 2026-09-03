import { expect, test } from '@playwright/test';

const publicRoutes = [
  ['/', 'JSON model generation you can inspect'],
  ['/json-to-typescript', 'JSON to TypeScript generator'],
  ['/json-to-java', 'JSON to Java class generator'],
  ['/json-to-spring-boot', 'JSON to Spring Boot models'],
  ['/json-to-csharp', 'JSON to C# model generator'],
  ['/json-to-python', 'JSON to Python model generator'],
] as const;

test('serves unique static SEO content before hydration', async ({
  request,
}) => {
  for (const [route, heading] of publicRoutes) {
    const response = await request.get(route);
    expect(response.ok()).toBe(true);
    const html = await response.text();
    expect(html).toContain('<h1');
    expect(html).toContain(heading);
    expect(html).toContain('application/ld+json');
    expect(html).toContain(`rel="canonical"`);
  }
});

test('runs the local TypeScript generation path', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );

  await expect(page).toHaveTitle(/ModelForge/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'JSON model generation',
  );
  await expect(
    page.getByText(/Your JSON stays in this browser/i),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Generate' }).click();
  await expect(page.getByRole('tab', { name: 'models.ts' })).toBeVisible();
  await expect(page.getByText(/export interface User/)).toBeVisible();
});

test('runs the local C# and Python generation paths', async ({ page }) => {
  await page.goto('/json-to-csharp');
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );
  await expect(page.getByRole('combobox', { name: 'Target' })).toHaveValue(
    'csharp',
  );
  await page.getByRole('button', { name: 'Generate' }).click();
  await expect(page.getByRole('tab', { name: 'User.cs' })).toBeVisible();
  await expect(page.getByLabel('Generated output')).toContainText(
    'public sealed class User',
  );

  await page.goto('/json-to-python');
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );
  const pythonStyle = page.getByRole('combobox', { name: 'Python style' });
  await pythonStyle.selectOption('pydantic');
  await expect(pythonStyle).toHaveValue('pydantic');
  await page.getByRole('button', { name: 'Generate' }).click();
  await expect(page.getByRole('tab', { name: 'models.py' })).toBeVisible();
  await expect(page.getByLabel('Generated output')).toContainText(
    'class User(BaseModel)',
  );
});

test('uses accessible sequential stages on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.forge-shell')).toHaveAttribute(
    'data-hydrated',
    'true',
  );
  await expect(page.getByRole('button', { name: '1 source' })).toBeVisible();
  const references = page.getByRole('switch', { name: 'REFERENCES' });
  const language = page.getByRole('combobox', {
    name: 'Interface language',
  });
  const [referenceBox, languageBox] = await Promise.all([
    references.boundingBox(),
    language.boundingBox(),
  ]);
  expect(referenceBox).not.toBeNull();
  expect(languageBox).not.toBeNull();
  expect(languageBox!.y).toBeGreaterThan(
    referenceBox!.y + referenceBox!.height,
  );

  for (const control of [
    page.getByRole('button', { name: 'Generate' }),
    page.getByRole('button', { name: 'Reset' }),
  ]) {
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390);
    expect(box!.y + box!.height).toBeLessThanOrEqual(844);
  }

  await page.getByRole('button', { name: '2 model' }).click();
  await expect(
    page.getByRole('heading', { name: 'Model inspection' }),
  ).toBeVisible();
});
