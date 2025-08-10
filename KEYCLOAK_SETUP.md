# Keycloak + APIMan Setup Guide for EPITA Twitter

This guide will help you set up Keycloak authentication with APIMan to secure your EPITA Twitter API.

## Prerequisites

- Keycloak server running on `http://localhost:8080`
- APIMan server running on `http://localhost:8080/apimanui`
- ApacheDS instance (from Advanced Databases Lectures)
- Node.js and npm installed

## Step 1: Set up Keycloak Realm

### 1.1 Access Keycloak Admin Console
1. Open your browser and go to `http://localhost:8080/auth`
2. Login with your admin credentials
3. Click on "Administration Console"

### 1.2 Create New Realm
1. In the top-left dropdown, click "Add realm"
2. Enter realm name: `epita-twitter`
3. Click "Create"

### 1.3 Import Realm Configuration (Alternative)
If you prefer to import the configuration:
1. Go to "Import" in the realm dropdown
2. Upload the `keycloak-realm-config.json` file from this project
3. Click "Create"

### 1.4 Configure Realm Settings
1. Go to "Realm Settings" → "General"
2. Set Display Name: "EPITA Twitter Realm"
3. Save the settings

## Step 2: Create Client Application

### 2.1 Create Client
1. Go to "Clients" in the left sidebar
2. Click "Create"
3. Set Client ID: `X_JavaScript`
4. Set Client Protocol: `openid-connect`
5. Click "Save"

### 2.2 Configure Client Settings
1. Set Access Type: `confidential`
2. Set Valid Redirect URIs: 
   - `http://localhost:3000/*`
   - `http://localhost:8080/*`
   - `http://localhost:3001/auth/keycloak/callback`
3. Set Web Origins: 
   - `http://localhost:3000`
   - `http://localhost:8080`
4. Click "Save"

### 2.3 Get Client Secret
1. Go to the "Credentials" tab
2. Copy the Client Secret (you'll need this for the backend configuration)

### 2.4 Configure Protocol Mappers
1. Go to the "Mappers" tab
2. Click "Create"
3. Add the following mappers:

#### Username Mapper
- Name: `username`
- Mapper Type: `User Property`
- Property: `username`
- Token Claim Name: `preferred_username`
- Add to ID token: `ON`
- Add to access token: `ON`
- Add to userinfo: `ON`

#### Email Mapper
- Name: `email`
- Mapper Type: `User Property`
- Property: `email`
- Token Claim Name: `email`
- Add to ID token: `ON`
- Add to access token: `ON`
- Add to userinfo: `ON`

#### Roles Mapper
- Name: `roles`
- Mapper Type: `Realm Role`
- Token Claim Name: `realm_access.roles`
- Add to ID token: `ON`
- Add to access token: `ON`
- Add to userinfo: `ON`
- Multivalued: `ON`

## Step 3: Create Users and Roles

### 3.1 Create Roles
1. Go to "Roles" in the left sidebar
2. Click "Add Role"
3. Create role: `admin`
4. Create role: `user`

### 3.2 Create Users
1. Go to "Users" in the left sidebar
2. Click "Add User"
3. Create user with username: `admin`
4. Set email: `admin@epita-twitter.com`
5. Go to "Credentials" tab
6. Set password: `admin123`
7. Turn off "Temporary"
8. Go to "Role Mappings" tab
9. Assign "admin" role
10. Repeat for user `user1` with password `user123` and "user" role

## Step 4: Connect to ApacheDS

### 4.1 Configure User Federation
1. Go to "User Federation" in the left sidebar
2. Click "Add provider" → "ldap"
3. Configure the following settings:
   - Vendor: `ApacheDS`
   - Connection URL: `ldap://localhost:10389`
   - Bind DN: `uid=admin,ou=system`
   - Bind Credential: `secret`
   - Search Base: `ou=users,ou=system`
   - User DN: `ou=users,ou=system`
   - Username LDAP attribute: `uid`
   - RDN LDAP attribute: `uid`
   - UUID LDAP attribute: `entryUUID`
   - User Object Classes: `person, organizationalPerson`

### 4.2 Test Connection
1. Click "Test connection" to verify the connection works
2. Click "Test authentication" to verify user lookup works

## Step 5: Configure APIMan

### 5.1 Access APIMan UI
1. Go to `http://localhost:8080/apimanui`
2. Login with your APIMan credentials

### 5.2 Configure OIDC Policy
1. Navigate to your client application "X_JavaScript"
2. Go to "Policies" tab
3. Click "Add Policy"
4. Select "Keycloak OAuth Policy"
5. Configure the following settings:
   - **Realm**: `epita-twitter`
   - **Auth Server URL**: `http://localhost:8080/auth`
   - **Client ID**: `X_JavaScript`
   - **Client Secret**: (the secret from Step 2.3)
   - **Public Key**: (get this from Keycloak realm settings)
   - **Token Endpoint**: `http://localhost:8080/auth/realms/epita-twitter/protocol/openid-connect/token`
   - **User Info Endpoint**: `http://localhost:8080/auth/realms/epita-twitter/protocol/openid-connect/userinfo`
   - **JWKS URI**: `http://localhost:8080/auth/realms/epita-twitter/protocol/openid-connect/certs`

### 5.3 Get Public Key
1. In Keycloak, go to "Realm Settings" → "Keys"
2. Copy the public key (RS256)

## Step 6: Configure Backend

### 6.1 Install Dependencies
```bash
cd back-end
npm install
```

### 6.2 Set Environment Variables
Create a `.env` file in the `back-end` directory:
```env
# Database
DATABASE_TYPE=sqlite
DATABASE_DATABASE=epita-twitter.db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Keycloak Configuration
KEYCLOAK_AUTH_SERVER_URL=http://localhost:8080/auth
KEYCLOAK_REALM=epita-twitter
KEYCLOAK_CLIENT_ID=X_JavaScript
KEYCLOAK_CLIENT_SECRET=your-client-secret-from-keycloak
KEYCLOAK_PUBLIC_KEY=your-public-key-from-keycloak-realm

# Server
PORT=3001
```

### 6.3 Start Backend
```bash
npm run start:dev
```

## Step 7: Configure Frontend

### 7.1 Install Dependencies
```bash
cd front-end
npm install
```

### 7.2 Start Frontend
```bash
npm start
```

## Step 8: Test the Integration

### 8.1 Test Keycloak Login
1. Go to `http://localhost:3000`
2. Click "Login with Keycloak"
3. You should be redirected to Keycloak login page
4. Login with one of the users you created
5. You should be redirected back to your application

### 8.2 Test API Protection
1. Try to access a protected API endpoint
2. The request should include the Keycloak token
3. APIMan should validate the token and allow/deny access

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your Keycloak client has the correct Web Origins configured
2. **Token Validation Failures**: Verify the public key in APIMan matches the one from Keycloak
3. **Connection Issues**: Ensure all services (Keycloak, APIMan, ApacheDS) are running
4. **User Not Found**: Check the LDAP configuration and user mapping

### Debug Steps

1. Check browser console for JavaScript errors
2. Check backend logs for authentication errors
3. Verify Keycloak realm configuration
4. Test LDAP connection separately
5. Validate APIMan policy configuration

## Security Considerations

1. **Change Default Passwords**: Update all default passwords
2. **Use HTTPS**: In production, use HTTPS for all communications
3. **Secure Client Secret**: Keep the client secret secure and rotate regularly
4. **Token Expiration**: Configure appropriate token expiration times
5. **Role-Based Access**: Implement proper role-based access control

## Next Steps

1. Implement role-based authorization in your API endpoints
2. Add user profile management
3. Implement token refresh logic
4. Add logout functionality
5. Set up monitoring and logging 