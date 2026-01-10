import { test, expect } from '@playwright/test';

test.describe('Autenticação Privada (Painel do Dono)', () => {

    test('deve permitir registrar, verificar senha e acessar o painel', async ({ page }) => {
        // 1. Navegar para a página de registro
        await page.goto('/privado/registro');
        await expect(page).toHaveTitle(/Cadastro de Clientes/); // O título global do app, a menos que mude por rota

        // Verificar elementos iniciais
        await expect(page.getByRole('heading', { name: 'Registro Privado' })).toBeVisible();
        await expect(page.getByPlaceholder('Escolha um usuário')).toBeVisible();
        await expect(page.getByPlaceholder('Escolha uma senha forte')).toBeVisible();

        // 2. Testar "Olhinho" (Inspeção de Senha)
        // O input de senha deve ser type="password" inicialmente
        const passwordInput = page.getByPlaceholder('Escolha uma senha forte');
        await expect(passwordInput).toHaveAttribute('type', 'password');

        // Clicar no botão de toggle (olhinho)
        const toggleBtn = page.locator('.toggle-btn');
        await toggleBtn.click();

        // O input deve mudar para type="text"
        await expect(passwordInput).toHaveAttribute('type', 'text');

        // Clicar novamente para esconder
        await toggleBtn.click();
        await expect(passwordInput).toHaveAttribute('type', 'password');

        // 3. Preencher formulário de registro
        const uniqueUser = `dono_${Date.now()}`;
        await page.getByPlaceholder('Escolha um usuário').fill(uniqueUser);
        await passwordInput.fill('senhaSuperSecreta123');

        // 4. Enviar formulário
        await page.getByRole('button', { name: 'Registrar' }).click();

        // 5. Verificar mensagem de sucesso ("alerta")
        // O texto mudou para "Conta criada! Acessando painel..." na última iteração
        await expect(page.getByText('Conta criada! Acessando painel...')).toBeVisible();

        // 6. Verificar redirecionamento automático para o painel privado
        // Como o auto-login acontece, esperamos cair em /privado
        await expect(page).toHaveURL(/\/privado$/); // Regex para terminar com /privado (ignorando query params se houver)

        // Confirmar que estamos no painel (Header ou algum elemento exclusivo)
        await expect(page.getByRole('heading', { name: 'Eletrotécnica' })).toBeVisible();
        await expect(page.getByText(uniqueUser)).toBeVisible(); // O nome do usuário deve aparecer no header
    });

    test('deve validar campos no registro', async ({ page }) => {
        await page.goto('/privado/registro');

        // Tentar registrar vazio
        await page.getByRole('button', { name: 'Registrar' }).click();

        // Se houver validação HTML5 'required', o navegador impede o submit.
        // Se houver validação visual via *ngIf="error()":
        // No código atual: if (!this.username || !this.password) return; (sem setar erro visual, apenas return)
        // O ideal seria verificar se NÃO navegou ou se apareceu mensagem.

        // Mas adicionamos validação explícita na última iteração:
        // "O usuário deve ter pelo menos 3 caracteres."

        await page.getByPlaceholder('Escolha um usuário').fill('ab'); // curto
        await page.getByPlaceholder('Escolha uma senha forte').fill('123'); // curto
        await page.getByRole('button', { name: 'Registrar' }).click();

        await expect(page.getByText('O usuário deve ter pelo menos 3 caracteres.')).toBeVisible();
    });
});
