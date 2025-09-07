# Expenses Categories API Documentation

## Endpoint: `/api/expenses/categories`

This endpoint provides comprehensive category management specifically for expenses with enhanced features like usage statistics, bulk operations, and advanced filtering.

---

## 🔍 **GET** `/api/expenses/categories`

Retrieve expense categories with optional usage statistics.

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `includeUsage` | boolean | false | Include expense usage statistics for categories |
| `userId` | string | - | Required if `includeUsage=true`. User ID for usage statistics |
| `timeframe` | string | "30d" | Time period for usage stats: "7d", "30d", "90d", "1y" |

### Example Requests

#### Basic categories list:
```bash
GET /api/expenses/categories
```

#### Categories with usage statistics:
```bash
GET /api/expenses/categories?includeUsage=true&userId=64f8d2e5c8b4a9f1e2d3c4b5&timeframe=30d
```

### Response Format

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8d2e5c8b4a9f1e2d3c4b5",
      "name": "Food & Dining",
      "icon": "🍽️",
      "color": "#FF6B6B",
      "description": "Restaurant meals and food expenses",
      "keywords": ["food", "restaurant", "dining", "meal"],
      "parentCategory": null,
      "isDefault": true,
      "isActive": true,
      "createdAt": "2025-09-07T08:00:00.000Z",
      "updatedAt": "2025-09-07T08:00:00.000Z",
      "usage": {
        "count": 15,
        "totalAmount": 4500,
        "avgAmount": 300
      }
    }
  ],
  "meta": {
    "includeUsage": true,
    "timeframe": "30d",
    "count": 12
  }
}
```

---

## ➕ **POST** `/api/expenses/categories`

Create a new expense category.

### Request Body

```json
{
  "name": "Custom Category",
  "icon": "🎯",
  "color": "#FF5733",
  "description": "Description of the category",
  "keywords": ["keyword1", "keyword2"],
  "parentCategory": "Parent Category Name",
  "isDefault": false
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Unique category name |
| `icon` | string | - | Emoji or icon for the category |
| `color` | string | - | Hex color code (default: "#6366f1") |
| `description` | string | - | Category description |
| `keywords` | string[] | - | Keywords for auto-categorization |
| `parentCategory` | string | - | Parent category name for hierarchy |
| `isDefault` | boolean | - | Whether it's a default category (default: false) |

### Response

```json
{
  "success": true,
  "data": {
    "_id": "64f8d2e5c8b4a9f1e2d3c4b6",
    "name": "Custom Category",
    "icon": "🎯",
    "color": "#FF5733",
    "description": "Description of the category",
    "keywords": ["keyword1", "keyword2"],
    "parentCategory": "Parent Category Name",
    "isDefault": false,
    "isActive": true,
    "createdAt": "2025-09-07T08:30:00.000Z",
    "updatedAt": "2025-09-07T08:30:00.000Z"
  },
  "message": "Expense category created successfully"
}
```

---

## 🔄 **PUT** `/api/expenses/categories`

Bulk update multiple categories.

### Request Body

```json
{
  "categories": [
    {
      "id": "64f8d2e5c8b4a9f1e2d3c4b5",
      "name": "Updated Category Name",
      "description": "Updated description",
      "keywords": ["updated", "keywords"],
      "isActive": true
    },
    {
      "id": "64f8d2e5c8b4a9f1e2d3c4b6",
      "color": "#00FF00",
      "icon": "🔥"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8d2e5c8b4a9f1e2d3c4b5",
      "name": "Updated Category Name",
      // ... updated category data
    }
  ],
  "message": "2 categories updated successfully"
}
```

---

## 🗑️ **DELETE** `/api/expenses/categories`

Delete multiple categories (bulk operation).

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ids` | string | ✅ | Comma-separated list of category IDs |

### Example Request

```bash
DELETE /api/expenses/categories?ids=64f8d2e5c8b4a9f1e2d3c4b5,64f8d2e5c8b4a9f1e2d3c4b6
```

### Response

```json
{
  "success": true,
  "data": {
    "deletedCount": 2
  },
  "message": "2 categories deleted successfully"
}
```

### Error Response (Categories in Use)

```json
{
  "error": "Cannot delete categories that are in use",
  "categoriesInUse": [
    {
      "categoryId": "64f8d2e5c8b4a9f1e2d3c4b5",
      "name": "Food & Dining",
      "expenseCount": 15
    }
  ]
}
```

---

## 🚨 **Error Responses**

### 400 - Bad Request
```json
{
  "error": "Category name is required"
}
```

### 409 - Conflict
```json
{
  "error": "Category already exists"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Failed to fetch expense categories"
}
```

---

## 🔧 **Usage Examples**

### JavaScript/TypeScript

```typescript
// Fetch categories with usage stats
const response = await fetch('/api/expenses/categories?includeUsage=true&userId=USER_ID&timeframe=30d');
const { data: categories } = await response.json();

// Create new category
const newCategory = await fetch('/api/expenses/categories', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Fitness & Health',
    icon: '💪',
    color: '#00FF00',
    keywords: ['gym', 'fitness', 'health', 'workout']
  })
});

// Bulk update
const updatedCategories = await fetch('/api/expenses/categories', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    categories: [
      { id: 'CATEGORY_ID', name: 'Updated Name' },
      { id: 'CATEGORY_ID_2', color: '#FF0000' }
    ]
  })
});

// Delete categories
const deleteResponse = await fetch('/api/expenses/categories?ids=ID1,ID2', {
  method: 'DELETE'
});
```

### cURL Examples

```bash
# Get categories
curl -X GET "http://localhost:3000/api/expenses/categories"

# Get categories with usage
curl -X GET "http://localhost:3000/api/expenses/categories?includeUsage=true&userId=USER_ID"

# Create category
curl -X POST "http://localhost:3000/api/expenses/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Category",
    "icon": "🧪",
    "color": "#FF5733"
  }'

# Bulk update
curl -X PUT "http://localhost:3000/api/expenses/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "categories": [
      {"id": "CATEGORY_ID", "name": "Updated Name"}
    ]
  }'

# Delete categories
curl -X DELETE "http://localhost:3000/api/expenses/categories?ids=ID1,ID2"
```

---

## 🔍 **Key Features**

1. **Usage Statistics**: Track how often categories are used and total amounts
2. **Bulk Operations**: Update or delete multiple categories in one request
3. **Hierarchical Categories**: Support for parent-child category relationships
4. **Smart Keywords**: Keywords for automatic expense categorization
5. **Safe Deletion**: Prevents deletion of categories that are currently in use
6. **Default Categories**: Built-in categories that cannot be deleted
7. **Timeframe Filtering**: Flexible time periods for usage analysis

---

## 🧪 **Testing**

Run the test script to verify all functionality:

```bash
node test-expenses-categories.js
# or
node test-expenses-categories.js --port=3003
```

The test script covers:
- ✅ Basic category retrieval
- ✅ Usage statistics
- ✅ Category creation
- ✅ Duplicate prevention
- ✅ Bulk updates
- ✅ Category deletion
- ✅ Error handling
