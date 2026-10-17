
/* ===================================
   AGENDAMENTO PELO WHATSAPP
=================================== */

const formularioAgendamento = document.getElementById("form-agendamento");
const campoData = document.getElementById("data-agendamento");

// Número fictício para demonstração.
// Substituir por um número autorizado antes de publicar.
const numeroWhatsApp = "5511977459187";

// Impede a escolha de datas anteriores ao dia atual.
function atualizarDataMinima() {
    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    campoData.min = `${ano}-${mes}-${dia}`;
}

atualizarDataMinima();

formularioAgendamento.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome-cliente").value.trim();
    const servico = document.getElementById("servico").value;
    const barbeiro = document.getElementById("barbeiro").value;
    const data = campoData.value;
    const horario = document.getElementById("horario-agendamento").value;

    if (!nome || !servico || !barbeiro || !data || !horario) {
        alert("Preencha todos os campos do agendamento.");
        return;
    }

    // Verifica novamente a data no momento do envio.
    atualizarDataMinima();

    if (data < campoData.min) {
        alert("Selecione uma data válida para o agendamento.");
        return;
    }

    // Converte AAAA-MM-DD para DD/MM/AAAA.
    const [ano, mes, dia] = data.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const mensagem =
        `*BARBEARIA PRIME — SOLICITAÇÃO DE AGENDAMENTO* 💈\n\n` +
        `*Cliente:* ${nome}\n` +
        `*Serviço:* ${servico}\n` +
        `*Profissional:* ${barbeiro}\n` +
        `*Data:* ${dataFormatada}\n` +
        `*Horário:* ${horario}\n\n` +
        `Olá! Gostaria de verificar a disponibilidade para esse horário.`;

    const urlWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
});

/* ===================================
   ANO AUTOMÁTICO NO RODAPÉ
=================================== */

const anoAtual = document.getElementById("ano-atual");

anoAtual.textContent = new Date().getFullYear();

/* ===================================
   MENU MOBILE
=================================== */

const botaoMenu = document.getElementById("menu-toggle");
const menuNavegacao = document.getElementById("menu-navegacao");

if (botaoMenu && menuNavegacao) {

    botaoMenu.addEventListener("click", function () {
        const menuAberto = menuNavegacao.classList.toggle("active");

        botaoMenu.setAttribute("aria-expanded", String(menuAberto));
        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );

        botaoMenu.textContent = menuAberto ? "✕" : "☰";
    });

    // Fecha o menu quando o visitante escolhe uma seção.
    const linksMenu = menuNavegacao.querySelectorAll("a");

    linksMenu.forEach(function (link) {
        link.addEventListener("click", function () {
            menuNavegacao.classList.remove("active");

            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            botaoMenu.textContent = "☰";
        });
    });

}
