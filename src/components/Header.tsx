export function Header() {
  return (
    <header class="site-header">
      <div class="container header-inner">
        <a
          class="brand"
          href={import.meta.env.BASE_URL}
          aria-label="VKS — início"
        >
          <img
            src={`${import.meta.env.BASE_URL}brand/vks-logo.png`}
            alt="VKS — VemCantar Karaokê Show"
            class="brand-logo"
          />

          <span class="brand-copy">
            <strong>VemCantar</strong>
            <span>Karaokê Show</span>
          </span>
        </a>

        <div
          class="header-tag"
          aria-label="Catálogo oficial de músicas"
        >
          <span
            class="header-dot"
            aria-hidden="true"
          ></span>

          Catálogo VKS
        </div>
      </div>
    </header>
  );
}
