import { test, expect } from '@playwright/test';

/**
 * Testes E2E para navegação e fluxo geral da aplicação
 */
test.describe('Navegação e Fluxo Geral', () => {

    test.beforeEach(async ({ page }) => {
        // Fazer login antes de cada teste
        await page.goto('/login');
        await page.getByLabel(/email/i).fill('Mauricio@oficina.com');
        await page.getByLabel(/senha/i).fill('admin123');
        await page.getByRole('button', { name: /entrar/i }).click();
        await expect(page).toHaveURL(/dashboard/);
    });

    test('deve navegar entre as páginas principais', async ({ page }) => {
        // Dashboard
        await expect(page).toHaveURL(/dashboard/);
        await expect(page.getByText(/dashboard/i)).toBeVisible();

        // Clientes
        await page.getByRole('link', { name: /clientes/i }).click();
        await expect(page).toHaveURL(/clientes/);

        // Ordens de Serviço
        await page.getByRole('link', { name: /ordens.*serviço/i }).click();
        await expect(page).toHaveURL(/ordens-servico/);

        // Voltar ao Dashboard
        await page.getByRole('link', { name: /dashboard/i }).click();
        await expect(page).toHaveURL(/dashboard/);
    });

    test('deve exibir menu de navegação corretamente', async ({ page }) => {
        // Verificar itens do menu
        await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /clientes/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /ordens.*serviço/i })).toBeVisible();
    });

    test('deve exibir informações do usuário logado', async ({ page }) => {
        // Verificar que o nome/email do usuário está visível
        await expect(page.getByText(/Mauricio@oficina.com/i)).toBeVisible();
    });

    test('deve ser responsivo em dispositivos móveis', async ({ page }) => {
        // Redimensionar para mobile
        await page.setViewportSize({ width: 375, height: 667 });

        // Verificar que o menu mobile está visível
        const menuButton = page.getByRole('button', { name: /menu/i });
        await expect(menuButton).toBeVisible();

        // Abrir menu mobile
        await menuButton.click();

        // Verificar itens do menu
        await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
    });

    test('deve manter sessão após recarregar página', async ({ page }) => {
        // Recarregar página
        await page.reload();

        // Verificar que ainda está autenticado
        await expect(page).toHaveURL(/dashboard/);
        await expect(page.getByText(/bem-vindo/i)).toBeVisible();
    });
});

/**
 * Testes E2E para Dashboard
 */
test.describe('Dashboard', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.getByLabel(/email/i).fill('Mauricio@oficina.com');
        await page.getByLabel(/senha/i).fill('admin123');
        await page.getByRole('button', { name: /entrar/i }).click();
        await expect(page).toHaveURL(/dashboard/);
    });

    test('deve exibir KPIs principais', async ({ page }) => {
        // Verificar cards de KPIs
        await expect(page.getByText(/total de clientes/i)).toBeVisible();
        await expect(page.getByText(/ordens.*abertas/i)).toBeVisible();
        await expect(page.getByText(/ordens.*concluídas/i)).toBeVisible();
    });

    test('deve exibir gráficos e estatísticas', async ({ page }) => {
        // Verificar presença de gráficos (pode variar conforme implementação)
        const charts = page.locator('canvas, svg[class*="chart"]');
        await expect(charts.first()).toBeVisible();
    });

    test('deve exibir lista de ordens recentes', async ({ page }) => {
        // Verificar seção de ordens recentes
        await expect(page.getByText(/ordens recentes/i)).toBeVisible();
    });
});
