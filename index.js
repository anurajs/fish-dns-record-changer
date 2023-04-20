import fetch from 'node-fetch';
import { config } from 'dotenv';
config();
import { exec } from 'child_process';

exec('curl ip-adresim.app', function (error, ip, _std_error) {
  if (error) return;
  const zoneIdentifier = process.env.ZONE_IDENTIFIER;
  const Identifier = process.env.IDENTIFIER;

  const url = `https://api.cloudflare.com/client/v4/zones/${zoneIdentifier}/dns_records/${Identifier}`;
  const data = {
    content: ip,
    name: '@',
    proxied: false,
    type: 'A',
    ttl: 1
  };
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`,
    'content-type': 'application/json'
  };
  fetch(url, { method: 'PUT', body: JSON.stringify(data), headers })
    .then((res) => res.json())
    .then((json) => console.log(json));
});
