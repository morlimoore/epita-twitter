#!/usr/bin/env node

/**
 * EPITA Twitter - Keycloak Integration Test Script
 * 
 * This script helps you test your Keycloak integration
 * Run with: node test-integration.js
 */

const http = require('http');
const https = require('https');

console.log('🔍 EPITA Twitter - Keycloak Integration Test');
console.log('============================================\n');

// Test configuration
const services = [
  {
    name: 'Backend API',
    url: 'http://localhost:3001/health',
    expected: 'Backend API is running'
  },
  {
    name: 'Frontend App',
    url: 'http://localhost:3000',
    expected: 'React application'
  },
  {
    name: 'Keycloak Server',
    url: 'http://localhost:8080/auth',
    expected: 'Keycloak'
  },
  {
    name: 'APIMan UI',
    url: 'http://localhost:8080/apimanui',
    expected: 'APIMan'
  }
];

// Test Keycloak realm
const keycloakRealm = 'http://localhost:8080/auth/realms/epita-twitter';

async function testService(service) {
  return new Promise((resolve) => {
    const url = new URL(service.url);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        // Consider 200, 302, 303 as healthy (normal responses)
        const isHealthy = res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 303;
        resolve({
          name: service.name,
          url: service.url,
          status: res.statusCode,
          healthy: isHealthy,
          expected: service.expected
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        name: service.name,
        url: service.url,
        status: 'ERROR',
        healthy: false,
        error: err.message,
        expected: service.expected
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: service.name,
        url: service.url,
        status: 'TIMEOUT',
        healthy: false,
        error: 'Request timeout',
        expected: service.expected
      });
    });

    req.end();
  });
}

async function testKeycloakRealm() {
  return new Promise((resolve) => {
    const url = new URL(keycloakRealm);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const realmInfo = JSON.parse(data);
          const isConfigured = realmInfo.realm === 'epita-twitter';
          resolve({
            name: 'Keycloak Realm',
            url: keycloakRealm,
            status: res.statusCode,
            healthy: isConfigured,
            realm: realmInfo.realm,
            expected: 'epita-twitter'
          });
        } catch (e) {
          resolve({
            name: 'Keycloak Realm',
            url: keycloakRealm,
            status: res.statusCode,
            healthy: false,
            error: 'Invalid JSON response',
            expected: 'epita-twitter'
          });
        }
      });
    });

    req.on('error', (err) => {
      resolve({
        name: 'Keycloak Realm',
        url: keycloakRealm,
        status: 'ERROR',
        healthy: false,
        error: err.message,
        expected: 'epita-twitter'
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: 'Keycloak Realm',
        url: keycloakRealm,
        status: 'TIMEOUT',
        healthy: false,
        error: 'Request timeout',
        expected: 'epita-twitter'
      });
    });

    req.end();
  });
}

async function runTests() {
  console.log('Testing services...\n');

  // Test basic services
  const serviceResults = await Promise.all(services.map(testService));
  
  // Test Keycloak realm
  const realmResult = await testKeycloakRealm();
  
  // Display results
  console.log('📊 Test Results:');
  console.log('================\n');

  let allHealthy = true;

  serviceResults.forEach(result => {
    const status = result.healthy ? '✅' : '❌';
    console.log(`${status} ${result.name}`);
    console.log(`   URL: ${result.url}`);
    console.log(`   Status: ${result.status}`);
    if (result.status === 302 || result.status === 303) {
      console.log(`   Note: ${result.status} is a normal redirect response`);
    }
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    console.log('');
    if (!result.healthy) allHealthy = false;
  });

  // Keycloak realm test
  const realmStatus = realmResult.healthy ? '✅' : '❌';
  console.log(`${realmStatus} ${realmResult.name}`);
  console.log(`   URL: ${realmResult.url}`);
  console.log(`   Status: ${realmResult.status}`);
  if (realmResult.realm) {
    console.log(`   Realm: ${realmResult.realm}`);
  }
  if (realmResult.error) {
    console.log(`   Error: ${realmResult.error}`);
  }
  console.log('');

  if (!realmResult.healthy) allHealthy = false;

  // Summary
  console.log('📋 Summary:');
  console.log('===========');
  
  if (allHealthy) {
    console.log('🎉 All tests passed! Your integration is ready for testing.');
    console.log('\n📹 Ready for video recording!');
    console.log('   - Backend: http://localhost:3001');
    console.log('   - Frontend: http://localhost:3000');
    console.log('   - Keycloak: http://localhost:8080/auth');
    console.log('   - APIMan: http://localhost:8080/apimanui');
  } else {
    console.log('⚠️  Some tests failed. Please check the services above.');
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Ensure all services are running');
    console.log('   2. Check Keycloak realm configuration');
    console.log('   3. Verify APIMan policy setup');
    console.log('   4. Review the KEYCLOAK_SETUP.md guide');
  }

  console.log('\n📖 Next steps:');
  console.log('   - Follow TESTING_GUIDE.md for video recording');
  console.log('   - Test authentication flows');
  console.log('   - Demonstrate API protection');
}

// Run the tests
runTests().catch(console.error); 