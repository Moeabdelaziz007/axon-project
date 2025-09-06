#!/bin/bash

# Comprehensive Bridge Test Script for Axon Universal Adapter
# Tests all connectivity paths between Next.js frontend and Python backend

set -e

FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:5000"

echo "🌉 Testing Axon Universal Adapter Bridge..."
echo "Frontend: $FRONTEND_URL"
echo "Backend: $BACKEND_URL"
echo ""

# Function to test endpoint with retry logic
test_endpoint() {
    local url="$1"
    local method="$2"
    local data="$3"
    local description="$4"
    
    echo "🔍 Testing: $description"
    echo "   URL: $url"
    
    if [ "$method" = "POST" ] && [ -n "$data" ]; then
        response=$(curl -sS -w "\nHTTP_CODE:%{http_code}" -X POST "$url" \
            -H 'Content-Type: application/json' \
            -d "$data" 2>&1 || echo "CURL_ERROR")
    else
        response=$(curl -sS -w "\nHTTP_CODE:%{http_code}" "$url" 2>&1 || echo "CURL_ERROR")
    fi
    
    if echo "$response" | grep -q "CURL_ERROR"; then
        echo "   ❌ Connection failed - service may be down"
    elif echo "$response" | grep -q "HTTP_CODE:200"; then
        echo "   ✅ Success (200 OK)"
        echo "$response" | head -n -1 | head -c 200 | sed 's/^/   📄 /'
    elif echo "$response" | grep -q "HTTP_CODE:400"; then
        echo "   ⚠️  Client error (400) - expected for session-required endpoints"
        echo "$response" | head -n -1 | head -c 150 | sed 's/^/   📄 /'
    elif echo "$response" | grep -q "HTTP_CODE:502"; then
        echo "   ❌ Bad Gateway (502) - Python backend may be down"
    else
        http_code=$(echo "$response" | grep "HTTP_CODE:" | cut -d: -f2)
        echo "   ⚠️  HTTP $http_code"
        echo "$response" | head -n -1 | head -c 150 | sed 's/^/   📄 /'
    fi
    echo ""
}

echo "=== Direct Backend Tests ==="
test_endpoint "$BACKEND_URL/api/dashboard" "GET" "" "Direct Python backend dashboard"
test_endpoint "$BACKEND_URL/send_message" "POST" '{"message":"Direct test"}' "Direct Python backend message"

echo "=== Bridge Proxy Tests ==="
test_endpoint "$FRONTEND_URL/api/bridge/api/dashboard" "GET" "" "Bridge → Python dashboard"
test_endpoint "$FRONTEND_URL/api/bridge/send_message" "POST" '{"message":"Bridge test"}' "Bridge → Python message"

echo "=== Frontend Health Check ==="
test_endpoint "$FRONTEND_URL/" "GET" "" "Next.js frontend root"
test_endpoint "$FRONTEND_URL/api/health" "GET" "" "Frontend health endpoint (if exists)"

echo "🏁 Bridge test complete!"
echo ""
echo "Expected results:"
echo "✅ Bridge → Python dashboard should return JSON"
echo "⚠️  Bridge → Python message should return 400 (no session)"
echo "✅ Next.js frontend should return HTML"
echo ""
echo "If all bridge tests pass, the Universal Adapter is working correctly! 🎉"
