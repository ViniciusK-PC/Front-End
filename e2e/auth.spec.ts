import { test, expect } from '@playwright/test';

/**
 * Testes E2E para o fluxo de autenticação
 */
test.describe('Autenticação', () => {

    test.beforeEach(async ({ page }) => {
        // Navegar para a página de login antes de cada teste
        await page.goto('/login');
    });

    test('deve exibir a página de login corretamente', async ({ page }) => {
        // Verificar título da página
        await expect(page).toHaveTitle(/Cadastro de Clientes/);

        // Verificar elementos da página
        await expect(page.getByLabel(/email/i)).toBeVisible();
        await expect(page.getByLabel(/senha/i)).toBeVisible();
        await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible();
    });

    test('deve fazer login com credenciais válidas', async ({ page }) => {
        // Preencher formulário de login
        await page.getByLabel(/email/i).fill('Mauricio@oficina.com');
        await page.getByLabel(/senha/i).fill('admin123');

        // Clicar no botão de login
        await page.getByRole('button', { name: /entrar/i }).click();

        // Verificar redirecionamento para dashboard
        await expect(page).toHaveURL(/dashboard/);

        // Verificar que o usuário está logado
        await expect(page.getByText(/bem-vindo/i)).toBeVisible();
    });

    test('deve exibir erro com credenciais inválidas', async ({ page }) => {
        // Preencher formulário com credenciais inválidas
        await page.getByLabel(/email/i).fill('usuario@invalido.com');
        await page.getByLabel(/senha/i).fill('senhaerrada');

        // Clicar no botão de login
        await page.getByRole('button', { name: /entrar/i }).click();

        // Verificar mensagem de erro
        await expect(page.getByText(/credenciais inválidas/i)).toBeVisible();

        // Verificar que permanece na página de login
        await expect(page).toHaveURL(/login/);
    });

    test('deve validar campos obrigatórios', async ({ page }) => {
        // Tentar fazer login sem preencher campos
        await page.getByRole('button', { name: /entrar/i }).click();

        // Verificar mensagens de validação
        await expect(page.getByText(/email é obrigatório/i)).toBeVisible();
        await expect(page.getByText(/senha é obrigatória/i)).toBeVisible();
    });

    test('deve validar formato de email', async ({ page }) => {
        // Preencher email com formato inválido
        await page.getByLabel(/email/i).fill('emailinvalido');
        await page.getByLabel(/senha/i).fill('senha123');

        // Tentar fazer login
        await page.getByRole('button', { name: /entrar/i }).click();

        // Verificar mensagem de validação
        await expect(page.getByText(/email inválido/i)).toBeVisible();
    });

    test('deve fazer logout com sucesso', async ({ page }) => {
        // Fazer login primeiro
        await page.getByLabel(/email/i).fill('Mauricio@oficina.com');
        await page.getByLabel(/senha/i).fill('admin123');
        await page.getByRole('button', { name: /entrar/i }).click();

        // Aguardar redirecionamento
        await expect(page).toHaveURL(/dashboard/);

        // Fazer logout
        await page.getByRole('button', { name: /sair/i }).click();

        // Verificar redirecionamento para login
        await expect(page).toHaveURL(/login/);
    });

    test('deve redirecionar para login ao acessar rota protegida sem autenticação', async ({ page }) => {
        // Tentar acessar dashboard sem estar logado
        await page.goto('/dashboard');

        // Verificar redirecionamento para login
        await expect(page).toHaveURL(/login/);
    });
});
