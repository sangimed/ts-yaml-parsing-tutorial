interface APIsConfig {
  apis: API[];
}

interface API {
  name: string;
  url: string;
  proxies: string[];
}
