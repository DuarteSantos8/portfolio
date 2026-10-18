// Impressum + privacy policy. German is the authoritative version (Swiss site,
// revDSG); English and Portuguese are translations of it.
const OWNER = 'Duarte Santos';
const EMAIL = 'contact@duarte-santos.ch';
const UPDATED = '19.10.2026';

const legal = {
  de: {
    updated: `Stand: ${UPDATED}`,
    imprint: {
      title: 'Impressum',
      sections: [
        { h: 'Verantwortlich für den Inhalt', p: [OWNER, 'Zürich, Schweiz', `E-Mail: ${EMAIL}`] },
        { h: 'Art der Website', p: ['Dies ist eine private, nicht kommerzielle Portfolio-Website. Es werden keine Waren oder Dienstleistungen verkauft.'] },
        { h: 'Haftungsausschluss', p: ['Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Haftungsansprüche wegen Schäden, die durch die Nutzung oder Nichtnutzung der angebotenen Informationen entstehen, sind ausgeschlossen, soweit gesetzlich zulässig.'] },
        { h: 'Haftung für Links', p: ['Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese Inhalte ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Der Zugriff auf und die Nutzung solcher Websites erfolgen auf eigene Gefahr.'] },
        { h: 'Urheberrecht', p: ['Texte, Bilder und Grafiken dieser Website gehören, soweit nicht anders angegeben, Duarte Santos. Die Verwendung ausserhalb dieser Website bedarf meiner vorherigen schriftlichen Zustimmung. Marken und Logos Dritter gehören ihren jeweiligen Inhabern.'] },
      ],
    },
    privacy: {
      title: 'Datenschutzerklärung',
      sections: [
        { h: '1. Verantwortlicher', p: [`Verantwortlich für die Datenbearbeitung auf dieser Website ist ${OWNER}, Zürich, Schweiz, ${EMAIL}.`, 'Diese Erklärung richtet sich nach dem Schweizer Datenschutzgesetz (DSG) und, soweit anwendbar, nach der EU-Datenschutz-Grundverordnung (DSGVO).'] },
        { h: '2. Hosting und Server-Logs', p: ['Die Website läuft auf einem eigenen Server in der Schweiz. Der Datenverkehr wird über Cloudflare (Cloudflare, Inc., USA) geleitet, das die Seite schützt und schneller ausliefert. Dabei werden technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und Browser-Kennung verarbeitet. Das ist nötig, um die Website sicher und stabil zu betreiben (berechtigtes Interesse). Cloudflare kann Daten in den USA bearbeiten; die Übermittlung stützt sich auf die Standardvertragsklauseln bzw. das Swiss-U.S. Data Privacy Framework.'] },
        { h: '3. Besucherstatistik', p: ['Für eine anonyme Besucherstatistik nutze ich Umami, das auf meinem eigenen Server läuft. Umami setzt keine Cookies, erstellt keine Profile und speichert keine vollständigen IP-Adressen. Es wird nur ausgewertet, welche Seiten wie oft besucht werden. Es werden keine Daten an Dritte weitergegeben.'] },
        { h: '4. Kontaktformular', p: ['Wenn du mir über das Kontaktformular schreibst, werden Name, E-Mail-Adresse, Betreff und Nachricht übertragen. Die Nachricht wird über den Dienst EmailJS (emailjs.com) an mein E-Mail-Postfach weitergeleitet, das bei Zoho (Rechenzentrum in der EU) liegt. Ich nutze diese Daten ausschliesslich, um deine Anfrage zu beantworten. Grundlage ist deine Einwilligung, die du vor dem Absenden per Häkchen gibst. Du kannst sie jederzeit per E-Mail widerrufen.', 'EmailJS kann Daten ausserhalb der Schweiz und der EU bearbeiten. Die Angaben sind freiwillig; ohne sie kann ich dir aber nicht antworten. Ich lösche die Nachrichten, sobald sie erledigt sind, spätestens nach 12 Monaten, ausser es besteht eine gesetzliche Aufbewahrungspflicht.'] },
        { h: '5. Kontakt per E-Mail', p: [`Schreibst du mir direkt an ${EMAIL}, gilt dasselbe wie beim Kontaktformular, nur ohne EmailJS: Die E-Mail landet direkt in meinem Postfach bei Zoho.`] },
        { h: '6. Externe Dienste, die dein Browser direkt aufruft', p: ['Einige Inhalte lädt dein Browser direkt von Drittanbietern. Dabei erhält der jeweilige Anbieter deine IP-Adresse, weil er die Daten sonst nicht an dich schicken kann:', '• Open-Meteo (api.open-meteo.com) für das aktuelle Wetter in Zürich auf der Startseite.', '• GitHub (api.github.com, GitHub, Inc., USA) und GitLab (gitlab.com) für die Anzahl Sterne bei Projekten.', '• Spotify (Spotify AB, Schweden) für Album- und Künstlerbilder im Musik-Bereich. Die Musikdaten selbst holt mein Server; dabei werden keine Daten über dich an Spotify gesendet.', 'Schriftarten werden von meinem eigenen Server geladen, nicht von Google.'] },
        { h: '7. Cookies und lokale Speicherung', p: ['Diese Website setzt keine Cookies. Im lokalen Speicher deines Browsers (localStorage/sessionStorage) werden nur gespeichert: dein gewähltes Farbschema, deine Sprache, der Zeitpunkt deiner letzten Nachricht (gegen Spam) und kurzzeitig die Anzahl GitHub-Sterne. Diese Daten verlassen dein Gerät nicht und du kannst sie jederzeit in den Browser-Einstellungen löschen.'] },
        { h: '8. Links zu sozialen Netzwerken', p: ['Die Symbole für LinkedIn, GitHub und Instagram sind einfache Links. Es werden keine Plugins eingebunden; Daten werden erst übertragen, wenn du einen Link anklickst und die jeweilige Plattform besuchst.'] },
        { h: '9. Deine Rechte', p: [`Du hast das Recht auf Auskunft über deine Daten, auf Berichtigung, Löschung und Einschränkung der Bearbeitung, auf Datenherausgabe sowie das Recht, einer Bearbeitung zu widersprechen. Schreib mir dazu einfach an ${EMAIL}.`, 'Du kannst dich ausserdem beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB, edoeb.admin.ch) oder, falls du in der EU wohnst, bei der Datenschutzbehörde deines Landes beschweren.'] },
        { h: '10. Änderungen', p: ['Ich passe diese Erklärung an, wenn sich die Website ändert. Es gilt die jeweils hier veröffentlichte Fassung.'] },
      ],
    },
  },

  en: {
    updated: `Last updated: ${UPDATED}`,
    imprint: {
      title: 'Legal Notice',
      sections: [
        { h: 'Responsible for the content', p: [OWNER, 'Zurich, Switzerland', `Email: ${EMAIL}`] },
        { h: 'About this website', p: ['This is a private, non-commercial portfolio website. No goods or services are sold here.'] },
        { h: 'Disclaimer', p: ['The content of this website was created with care, but I cannot guarantee that it is correct, complete or up to date. To the extent permitted by law, liability for damages arising from the use or non-use of the information provided is excluded.'] },
        { h: 'External links', p: ['This website links to third-party websites whose content I have no control over. The respective provider or operator is always responsible for that content. Visiting such websites is at your own risk.'] },
        { h: 'Copyright', p: ['Unless stated otherwise, texts, images and graphics on this website belong to Duarte Santos. Using them outside this website requires my prior written permission. Third-party trademarks and logos belong to their respective owners.'] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      note: 'This is a translation. The German version is legally binding.',
      sections: [
        { h: '1. Controller', p: [`The controller for data processing on this website is ${OWNER}, Zurich, Switzerland, ${EMAIL}.`, 'This policy follows the Swiss Federal Act on Data Protection (FADP) and, where applicable, the EU General Data Protection Regulation (GDPR).'] },
        { h: '2. Hosting and server logs', p: ['The website runs on my own server in Switzerland. Traffic goes through Cloudflare (Cloudflare, Inc., USA), which protects the site and delivers it faster. Technically necessary data such as your IP address, date and time, the requested page and your browser identifier are processed in the process. This is needed to run the website securely and reliably (legitimate interest). Cloudflare may process data in the USA; transfers rely on the standard contractual clauses or the Swiss-U.S. Data Privacy Framework.'] },
        { h: '3. Visitor statistics', p: ['For anonymous visitor statistics I use Umami, running on my own server. Umami sets no cookies, builds no profiles and does not store full IP addresses. It only counts which pages are visited and how often. No data is shared with third parties.'] },
        { h: '4. Contact form', p: ['When you write to me through the contact form, your name, email address, subject and message are transmitted. The message is forwarded through the EmailJS service (emailjs.com) to my mailbox, which is hosted by Zoho (data center in the EU). I use this data only to reply to you. The legal basis is your consent, which you give by ticking the box before sending. You can withdraw it at any time by email.', 'EmailJS may process data outside Switzerland and the EU. Providing the data is voluntary, but without it I cannot reply. I delete messages once they are dealt with, at the latest after 12 months, unless the law requires me to keep them.'] },
        { h: '5. Contact by email', p: [`If you email me directly at ${EMAIL}, the same applies as for the contact form, just without EmailJS: the email goes straight to my Zoho mailbox.`] },
        { h: '6. External services your browser calls directly', p: ['Some content is loaded by your browser directly from third parties. Each provider receives your IP address, because it could not send you the data otherwise:', '• Open-Meteo (api.open-meteo.com) for the current weather in Zurich on the home page.', '• GitHub (api.github.com, GitHub, Inc., USA) and GitLab (gitlab.com) for the star counts on projects.', '• Spotify (Spotify AB, Sweden) for album and artist images in the music section. The music data itself is fetched by my server; no data about you is sent to Spotify for that.', 'Fonts are served from my own server, not from Google.'] },
        { h: '7. Cookies and local storage', p: ['This website sets no cookies. Your browser\'s local storage (localStorage/sessionStorage) only holds your chosen color theme, your language, the time of your last message (to prevent spam) and, briefly, the GitHub star counts. This data never leaves your device and you can delete it in your browser settings at any time.'] },
        { h: '8. Links to social networks', p: ['The LinkedIn, GitHub and Instagram icons are plain links. No plugins are embedded; data is only transferred once you click a link and visit that platform.'] },
        { h: '9. Your rights', p: [`You have the right to access your data, to have it corrected, deleted or its processing restricted, to receive a copy of it, and to object to processing. Just write to me at ${EMAIL}.`, 'You can also lodge a complaint with the Swiss Federal Data Protection and Information Commissioner (FDPIC, edoeb.admin.ch) or, if you live in the EU, with your national data protection authority.'] },
        { h: '10. Changes', p: ['I update this policy when the website changes. The version published here applies.'] },
      ],
    },
  },

  pt: {
    updated: `Última atualização: ${UPDATED}`,
    imprint: {
      title: 'Aviso Legal',
      sections: [
        { h: 'Responsável pelo conteúdo', p: [OWNER, 'Zurique, Suíça', `Email: ${EMAIL}`] },
        { h: 'Sobre este site', p: ['Este é um site de portfólio privado e não comercial. Não são vendidos produtos nem serviços.'] },
        { h: 'Exclusão de responsabilidade', p: ['O conteúdo deste site foi criado com cuidado, mas não posso garantir que esteja correto, completo ou atualizado. Na medida permitida por lei, exclui-se a responsabilidade por danos resultantes da utilização ou não utilização das informações disponibilizadas.'] },
        { h: 'Links externos', p: ['Este site contém links para sites de terceiros, sobre cujo conteúdo não tenho controlo. O respetivo fornecedor ou operador é sempre responsável por esse conteúdo. A visita a esses sites é por tua conta e risco.'] },
        { h: 'Direitos de autor', p: ['Salvo indicação em contrário, os textos, imagens e gráficos deste site pertencem a Duarte Santos. A sua utilização fora deste site requer a minha autorização prévia por escrito. Marcas e logótipos de terceiros pertencem aos respetivos titulares.'] },
      ],
    },
    privacy: {
      title: 'Política de Privacidade',
      note: 'Isto é uma tradução. A versão alemã é a juridicamente vinculativa.',
      sections: [
        { h: '1. Responsável', p: [`O responsável pelo tratamento de dados neste site é ${OWNER}, Zurique, Suíça, ${EMAIL}.`, 'Esta política segue a Lei Federal Suíça de Proteção de Dados (LPD) e, quando aplicável, o Regulamento Geral sobre a Proteção de Dados da UE (RGPD).'] },
        { h: '2. Alojamento e registos do servidor', p: ['O site corre num servidor próprio na Suíça. O tráfego passa pela Cloudflare (Cloudflare, Inc., EUA), que protege o site e o entrega mais rapidamente. Nesse processo são tratados dados tecnicamente necessários, como o endereço IP, data e hora, a página pedida e a identificação do navegador. Isto é necessário para manter o site seguro e estável (interesse legítimo). A Cloudflare pode tratar dados nos EUA; as transferências baseiam-se nas cláusulas contratuais-tipo ou no Swiss-U.S. Data Privacy Framework.'] },
        { h: '3. Estatísticas de visitas', p: ['Para estatísticas anónimas uso o Umami, que corre no meu próprio servidor. O Umami não usa cookies, não cria perfis e não guarda endereços IP completos. Só conta que páginas são visitadas e quantas vezes. Nenhum dado é partilhado com terceiros.'] },
        { h: '4. Formulário de contacto', p: ['Quando me escreves pelo formulário de contacto, são transmitidos o teu nome, endereço de email, assunto e mensagem. A mensagem é encaminhada pelo serviço EmailJS (emailjs.com) para a minha caixa de correio, alojada na Zoho (centro de dados na UE). Uso estes dados apenas para te responder. A base legal é o teu consentimento, que dás ao marcar a caixa antes de enviar. Podes retirá-lo a qualquer momento por email.', 'O EmailJS pode tratar dados fora da Suíça e da UE. O fornecimento dos dados é voluntário, mas sem eles não te posso responder. Apago as mensagens depois de tratadas, no máximo após 12 meses, salvo obrigação legal de conservação.'] },
        { h: '5. Contacto por email', p: [`Se me escreveres diretamente para ${EMAIL}, aplica-se o mesmo que no formulário, só que sem EmailJS: o email chega diretamente à minha caixa na Zoho.`] },
        { h: '6. Serviços externos chamados pelo teu navegador', p: ['Alguns conteúdos são carregados pelo teu navegador diretamente de terceiros. Cada fornecedor recebe o teu endereço IP, pois de outra forma não te conseguiria enviar os dados:', '• Open-Meteo (api.open-meteo.com) para o tempo atual em Zurique na página inicial.', '• GitHub (api.github.com, GitHub, Inc., EUA) e GitLab (gitlab.com) para o número de estrelas dos projetos.', '• Spotify (Spotify AB, Suécia) para imagens de álbuns e artistas na secção de música. Os dados de música em si são obtidos pelo meu servidor; para isso não é enviado nenhum dado sobre ti ao Spotify.', 'As fontes são servidas pelo meu próprio servidor, não pela Google.'] },
        { h: '7. Cookies e armazenamento local', p: ['Este site não usa cookies. O armazenamento local do teu navegador (localStorage/sessionStorage) guarda apenas o tema escolhido, o idioma, a hora da tua última mensagem (contra spam) e, por pouco tempo, o número de estrelas no GitHub. Estes dados nunca saem do teu dispositivo e podes apagá-los a qualquer momento nas definições do navegador.'] },
        { h: '8. Links para redes sociais', p: ['Os ícones do LinkedIn, GitHub e Instagram são simples links. Não são incorporados plugins; os dados só são transferidos quando clicas num link e visitas a plataforma.'] },
        { h: '9. Os teus direitos', p: [`Tens direito de acesso aos teus dados, à sua retificação, apagamento ou limitação do tratamento, a receber uma cópia e a opor-te ao tratamento. Basta escreveres para ${EMAIL}.`, 'Podes também apresentar reclamação junto do Comissário Federal Suíço para a Proteção de Dados (PFPDT, edoeb.admin.ch) ou, se viveres na UE, junto da autoridade de proteção de dados do teu país.'] },
        { h: '10. Alterações', p: ['Atualizo esta política quando o site muda. Aplica-se a versão aqui publicada.'] },
      ],
    },
  },
};

export default legal;
