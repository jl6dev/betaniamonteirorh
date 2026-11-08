(() => {
  const cfg = window.SITE_CONFIG || { whatsapp: "", forms: {} };
  const current = document.body.dataset.page || "home";
  const navItems = [
    ["index.html", "Início", "home"],
    ["talentos.html", "Banco de talentos", "talentos"],
    ["carretas.html", "Carretas da saúde", "carretas"],
    ["estagio.html", "Estágio", "estagio"],
    ["index.html#servicos", "Serviços", "servicos"]
  ];
  const header = document.querySelector("#site-header");
  if (header) {
    header.innerHTML = `<div class="topline"></div><div class="container nav">
      <a class="brand" href="index.html" aria-label="Betania Monteiro RH - início">
        <span class="logo-slot"><img src="assets/logopng.jpeg" alt="logopng" onerror="this.remove();this.parentElement.innerHTML='SUA<br>LOGO'"></span>
      </a>
      <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false">MENU ☰</button>
      <nav class="navlinks">${navItems.map(([url, label, key]) => `<a class="${current === key ? 'active' : ''}" href="${url}">${label}</a>`).join("")}</nav>
    </div>`;
    const toggle = header.querySelector(".menu-toggle");
    toggle.addEventListener("click", () => {
      const nav = header.querySelector(".navlinks");
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }
  const footer = document.querySelector("#site-footer");
  if (footer) footer.innerHTML = `<div class="container footer-inner"><div><strong>BETANIA MONTEIRO RH</strong><br>Talentos, empresas e oportunidades em movimento.</div><div>© <span data-year></span> · Todos os direitos reservados</div></div>`;
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  document.querySelectorAll("[data-form]").forEach(el => {
    const key = el.dataset.form;
    const url = (cfg.forms || {})[key] || "";
    if (url && !url.includes("COLOQUE-SEU-FORMULARIO")) {
      el.href = url; el.target = "_blank"; el.rel = "noopener noreferrer";
    } else {
      el.href = "#";
      el.addEventListener("click", e => {
        e.preventDefault();
        alert("Adicione o link do formulário externo no arquivo config.js para ativar este botão.");
      });
    }
  });
  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    el.addEventListener("click", () => {
      const message = el.dataset.whatsapp;
      const phone = (cfg.whatsapp || "").replace(/\D/g, "");
      if (!phone || phone === "5581999999999") {
        alert("Configure o número de WhatsApp no arquivo config.js antes de publicar o site.");
        return;
      }
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    });
  });
})();