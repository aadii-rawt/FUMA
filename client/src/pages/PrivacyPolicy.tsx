const PrivacyPolicy = () => {
    return (
        <div>
              <div className="container">
    <h1>Privacy Policy</h1>
    <p className="small">Last updated: <strong>$</strong></p>

    <p>
      This Privacy Policy describes the policies and procedures of <strong>$</strong>
      (“Company”, “we”, “us”, or “our”) on the collection, use, and disclosure of your
      information when you use our website, apps, and related services (the “Service”),
      and explains your privacy rights and how the law protects you. By using the Service,
      you agree to this Privacy Policy.
    </p>

    <h2>Interpretation and Definitions</h2>
    <h3>Interpretation</h3>
    <p>Words with initial capital letters have meanings defined below. These definitions apply whether they appear in singular or plural.</p>
    <h3>Definitions</h3>
    <ul>
      <li><strong>Account</strong>: a unique account created for you to access our Service.</li>
      <li><strong>Personal Data</strong>: any information relating to an identified or identifiable individual.</li>
      <li><strong>Usage Data</strong>: data collected automatically, e.g., IP address, browser type, pages visited.</li>
      <li><strong>Cookies</strong>: small files placed on your device to store certain information.</li>
      <li><strong>Service</strong>: the website and applications operated by ${}.</li>
    </ul>

    <hr/>

    <h2>Collecting and Using Your Personal Data</h2>
    <h3>Types of Data Collected</h3>
    <p><span className="badge">Personal Data</span></p>
    <p>We may collect your name, email, phone, social profiles connected via OAuth (e.g., Instagram/Facebook), billing and transaction details (for paid plans), and any content you submit.</p>

    <p><span className="badge">Usage Data</span></p>
    <p>Usage Data may include your IP address, browser type/version, pages visited, time and date of visit, time spent on pages, and device identifiers.</p>

    <p><span className="badge">Cookies & Tracking</span></p>
    <p>We use Cookies and similar technologies to operate and improve the Service. You can refuse Cookies in your browser settings, but some parts may not function properly.</p>

    <h3>Use of Your Personal Data</h3>
    <ul>
      <li>To provide, maintain, and improve the Service.</li>
      <li>To manage your Account and provide customer support.</li>
      <li>To process subscriptions, payments, and invoices.</li>
      <li>To operate integrations you authorize (e.g., Meta/Instagram for Auto-DM).</li>
      <li>To communicate updates and security alerts.</li>
      <li>To comply with legal obligations and enforce our terms.</li>
    </ul>

    <h3>Retention</h3>
    <p>We retain Personal Data only as long as necessary for the purposes described, to comply with legal obligations, resolve disputes, and enforce agreements.</p>

    <h3>Transfer</h3>
    <p>Your information may be processed in any location where involved parties are located. We take reasonable steps to ensure an adequate level of data protection.</p>

    <h3>Delete Your Personal Data</h3>
    <p>You can request deletion by emailing <a href="mailto:${contactEmail}"></a>. We may retain certain information as permitted by law.</p>

    <h3>Disclosure</h3>
    <ul>
      <li><strong>Business Transactions:</strong> e.g., merger, acquisition, or asset sale.</li>
      <li><strong>Legal Requirements:</strong> to comply with law or valid requests by authorities.</li>
      <li><strong>Service Providers:</strong> with vendors (hosting, analytics, payments) under appropriate safeguards.</li>
    </ul>

    <h3>Security</h3>
    <p>We use commercially reasonable measures to protect Personal Data, but no method of transmission or storage is 100% secure.</p>

    <h3>Children’s Privacy</h3>
    <p>The Service is not directed to individuals under 13 (or your local age of consent). We do not knowingly collect data from children.</p>

    <h3>Third-Party Links & Integrations</h3>
    <p>Our Service may include links or integrations (e.g., Meta/Instagram APIs). Their privacy practices are not governed by us; review their policies.</p>

    <h3>Changes to This Privacy Policy</h3>
    <p>We may update this Policy from time to time. We will post the new policy on this page with an updated “Last updated” date.</p>

    <h3>Contact Us</h3>
    <p>
      {/* Email: <a href="mailto:${contactEmail}">${contactEmail}</a><br/> */}
      {/* Address: ${companyAddress} */}
    </p>

    <hr/>
    <p className="small">This template is informational and not legal advice. Consult counsel for compliance (e.g., GDPR/DPDP/CCPA).</p>
  </div>
        </div>
    )
}

export default PrivacyPolicy