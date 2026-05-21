module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  let body = '';
  await new Promise((resolve) => {
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', resolve);
  });

  let email;
  try {
    email = JSON.parse(body).email;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  if (!email) return res.status(400).json({ error: 'Email required' });

  const response = await fetch(
    'https://api.beehiiv.com/v2/publications/pub_36df61d2-bbfc-486f-a232-8d69ce2d8c3e/subscriptions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.BEEHIIV_API_KEY
      },
      body: JSON.stringify({
        email: email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: 'parissportweek'
      })
    }
  );

  const data = await response.json();
  return res.status(200).json({ success: true, data: data });
};
