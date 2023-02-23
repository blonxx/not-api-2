const dotenv = require('dotenv')

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
	case 'production':
		ENV_FILE_NAME = '.env.production';
		break;
	case 'staging':
		ENV_FILE_NAME = '.env.staging';
		break;
	case 'test':
		ENV_FILE_NAME = '.env.test';
		break;
	case 'development':
	default:
		ENV_FILE_NAME = '.env';
		break;
}

try {
	dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {
}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Database URL (here we use a local database called medusa-development)
//const DATABASE_URL =
//  process.env.DATABASE_URL || "postgres://localhost/medusa-store";

// Medusa uses Redis, so this needs configuration as well
//const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
//const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
//const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
        {
          resolve: `medusa-file-s3`,
          options: {
              s3_url: process.env.MINIO_ENDPOINT,
              bucket: process.env.MINIO_BUCKET,
              region: 'pl-rack-1',
              access_key_id: process.env.MINIO_ACCESS_KEY,
              secret_access_key: process.env.MINIO_ACCESS_KEY,
          },
        },
    /* {
       resolve: `medusa-payment-stripe`,
       options: {
         api_key: process.env.STRIPE_API_KEY,
         webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
       },
     },	  
     {
   	resolve: `medusa-file-minio`,
    	options: {
        endpoint: process.env.MINIO_ENDPOINT,
        bucket: process.env.MINIO_BUCKET,
        key_id: process.env.MINIO_ACCESS_KEY,
        access_key: process.env.MINIO_SECRET_KEY,
        private_bucket: process.env.MINIO_BUCKET,
        private_access_key_id: process.env.MINIO_ACCESS_KEY,
        private_secret_access_key: process.env.MINIO_ACCESS_KEY,
        private_bucket: process.env.MINIO_PRIVATE_BUCKET,
       },
     },*/   
  /*   {	
	resolve: `medusa-plugin-sendgrid`,
	options: {
	api_key: process.env.SENDGRID_API_KEY,
  	from: "akeno@akeno.pl",
	order_placed_template:"d-7d7d2f67ad3d4025930c7093271f9984",		
       },
     },	*/     
];

module.exports = {
  projectConfig: {
    redis_url: process.env.REDIS_URL,
    database_url: process.env.DATABASE_URL,
    database_type: "postgres",
    store_cors: process.env.STORE_CORS,
    admin_cors: process.env.ADMIN_CORS,
    database_extra: { ssl: { rejectUnauthorized: false } },
  },
  plugins,
};
