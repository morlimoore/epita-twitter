# 🎬 EPITA Twitter - Keycloak Integration Testing Guide

This guide will help you test and demonstrate your Keycloak + APIMan integration for your video.

## 📋 **Video Recording Checklist**

### **Part 1: Introduction & Setup (2-3 minutes)**

#### 1.1 Project Overview
- [ ] Show project structure: `back-end/` and `front-end/` folders
- [ ] Highlight key files we created:
  - `keycloak-realm-config.json`
  - `back-end/src/auth/strategies/keycloak.strategy.ts`
  - `back-end/src/auth/strategies/keycloak-jwt.strategy.ts`
  - `front-end/src/services/keycloak.js`
  - `KEYCLOAK_SETUP.md`

#### 1.2 Keycloak Configuration
- [ ] Open Keycloak Admin Console: `http://localhost:8080/auth`
- [ ] Show the `epita-twitter` realm
- [ ] Display client configuration for `X_JavaScript`
- [ ] Show user roles: `admin` and `user`
- [ ] Demonstrate ApacheDS connection (if configured)

#### 1.3 APIMan Configuration
- [ ] Open APIMan UI: `http://localhost:8080/apimanui`
- [ ] Show the `X_JavaScript` client application
- [ ] Show the consumed API: `default/user_api` with plan `epita_JavaScript`
- [ ] Display the Keycloak OAuth policy configuration
- [ ] Show the policy settings (realm, endpoints, etc.)

### **Part 2: Application Testing (4-5 minutes)**

#### 2.1 Start Services
- [ ] Show backend running on `http://localhost:3001`
- [ ] Show frontend running on `http://localhost:3000`
- [ ] Verify both services are healthy

#### 2.2 Test Local Authentication (Existing)
- [ ] Navigate to `http://localhost:3000`
- [ ] Show the login page
- [ ] Register a new user with local authentication
- [ ] Login with local credentials
- [ ] Show the dashboard

#### 2.3 Test Keycloak Authentication
- [ ] Logout from local authentication
- [ ] Click "Login with Keycloak" (if button exists)
- [ ] Show redirect to Keycloak login page
- [ ] Login with Keycloak credentials:
  - Username: `admin` / Password: `admin123`
  - Username: `user1` / Password: `user123`
- [ ] Show successful redirect back to application
- [ ] Display user information from Keycloak

#### 2.4 Test API Protection
- [ ] Open browser developer tools (Network tab)
- [ ] Make an API request to a protected endpoint
- [ ] Show the Authorization header with Bearer token
- [ ] Demonstrate token validation

#### 2.5 Test Role-Based Access
- [ ] Login as admin user
- [ ] Show admin-specific features (if any)
- [ ] Login as regular user
- [ ] Show user-specific features
- [ ] Demonstrate role restrictions

### **Part 3: Technical Demonstration (2-3 minutes)**

#### 3.1 Code Walkthrough
- [ ] Show Keycloak strategy implementation
- [ ] Display JWT validation with JWKS
- [ ] Show frontend Keycloak service
- [ ] Demonstrate token refresh mechanism

#### 3.2 Security Features
- [ ] Show token expiration handling
- [ ] Demonstrate secure token storage
- [ ] Show CORS configuration
- [ ] Display error handling

## 🧪 **Testing Scenarios**

### **Scenario 1: Happy Path**
1. User clicks "Login with Keycloak"
2. Redirected to Keycloak login
3. Enters valid credentials
4. Successfully authenticated
5. Redirected back to application
6. Can access protected resources

### **Scenario 2: Invalid Credentials**
1. User clicks "Login with Keycloak"
2. Redirected to Keycloak login
3. Enters invalid credentials
4. Shows error message
5. Stays on Keycloak login page

### **Scenario 3: Token Expiration**
1. User is authenticated
2. Wait for token to expire (or manually expire)
3. Make API request
4. Show automatic token refresh
5. Continue with valid token

### **Scenario 4: Role-Based Access**
1. Login as admin user
2. Access admin-only features
3. Login as regular user
4. Try to access admin features
5. Show access denied

## 📹 **Video Recording Tips**

### **Screen Recording Setup**
- [ ] Use screen recording software (OBS, Camtasia, etc.)
- [ ] Set resolution to 1920x1080 or higher
- [ ] Enable system audio for any alerts
- [ ] Use a clear, readable font in your terminal

### **Narration Points**
- [ ] Explain what you're doing at each step
- [ ] Highlight security features
- [ ] Mention the integration benefits
- [ ] Show both success and error scenarios

### **Key Moments to Capture**
1. **Setup Phase**: Show configuration files and settings
2. **Authentication Flow**: Complete login process
3. **Token Handling**: Show tokens in network requests
4. **Error Scenarios**: Demonstrate error handling
5. **Security Features**: Show role-based access

## 🔧 **Troubleshooting**

### **Common Issues**
1. **CORS Errors**: Check Keycloak client Web Origins
2. **Token Validation**: Verify public key in APIMan
3. **Connection Issues**: Ensure all services are running
4. **Redirect Issues**: Check callback URLs

### **Debug Commands**
```bash
# Check if services are running
curl http://localhost:3001/health
curl http://localhost:3000

# Check Keycloak
curl http://localhost:8080/auth/realms/epita-twitter

# Check APIMan
curl http://localhost:8080/apimanui
```

## 📝 **Script for Video**

### **Opening (30 seconds)**
"Hello, today I'm demonstrating the Keycloak integration for my EPITA Twitter application. I've successfully integrated Keycloak authentication with APIMan to secure my API endpoints."

### **Setup Overview (1 minute)**
"Let me show you the project structure and the key files we've created for this integration..."

### **Configuration Demo (2 minutes)**
"Here's how I configured Keycloak with a custom realm, client application, and user roles..."

### **Testing Demo (3 minutes)**
"Now let's test the complete authentication flow from login to API access..."

### **Closing (30 seconds)**
"This demonstrates a secure, enterprise-grade authentication system using Keycloak and APIMan. The integration provides single sign-on, role-based access control, and secure API protection."

## ✅ **Success Criteria**

Your video should demonstrate:
- [ ] Complete authentication flow works
- [ ] API endpoints are properly protected
- [ ] Role-based access control functions
- [ ] Error handling is graceful
- [ ] Token management is secure
- [ ] Integration is production-ready

Good luck with your video recording! 🎥✨ 