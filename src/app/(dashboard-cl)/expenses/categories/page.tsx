"use client"

export const runtime = 'nodejs';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  MoreHorizontal,
  TrendingUp,
  Tag,
  Folder,
  PieChart,
  BarChart3,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  keywords: string[];
  parentCategory?: string;
  isActive: boolean;
  usageCount?: number;
  totalAmount?: number;
  lastUsed?: string;
  isDefault?: boolean;
  createdAt?: Date;
}

const defaultCategories = [
  { name: "Food & Dining", color: "#f59e0b", icon: "🍽️", description: "Restaurants, takeout, groceries" },
  { name: "Transportation", color: "#3b82f6", icon: "🚗", description: "Uber, gas, public transport" },
  { name: "Entertainment", color: "#8b5cf6", icon: "🎬", description: "Movies, games, subscriptions" },
  { name: "Shopping", color: "#ec4899", icon: "🛍️", description: "Clothes, electronics, general shopping" },
  { name: "Bills & Utilities", color: "#ef4444", icon: "💡", description: "Electricity, water, internet" },
  { name: "Healthcare", color: "#10b981", icon: "🏥", description: "Medical, pharmacy, insurance" },
  { name: "Travel", color: "#06b6d4", icon: "✈️", description: "Hotels, flights, vacation expenses" },
  { name: "Education", color: "#f97316", icon: "📚", description: "Books, courses, tuition" },
]

export default function ExpenseCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#3b82f6',
    icon: '',
    keywords: '',
    parentCategory: '',
    isActive: true
  })

  // Fetch categories
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/expenses/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  const createCategory = async () => {
    try {
      const categoryData = {
        ...newCategory,
        keywords: newCategory.keywords.split(',').map(k => k.trim()).filter(Boolean)
      }
      
      const response = await fetch('/api/expenses/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
      })

      if (response.ok) {
        toast.success("Category created successfully!")
        setIsCreateDialogOpen(false)
        setNewCategory({
          name: '',
          description: '',
          color: '#3b82f6',
          icon: '',
          keywords: '',
          parentCategory: '',
          isActive: true
        })
        fetchCategories()
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to create category")
      }
    } catch (error) {
      console.error('Error creating category:', error)
      toast.error("Failed to create category")
    }
  }

  const updateCategory = async () => {
    if (!editingCategory) return

    try {
      const categoryData = {
        name: editingCategory.name,
        description: editingCategory.description,
        color: editingCategory.color,
        icon: editingCategory.icon,
        keywords: editingCategory.keywords,
        parentCategory: editingCategory.parentCategory,
        isActive: editingCategory.isActive
      }
      
      const response = await fetch(`/api/expenses/categories`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ids: [editingCategory._id],
          updates: categoryData 
        })
      })

      if (response.ok) {
        toast.success("Category updated successfully!")
        setIsEditDialogOpen(false)
        setEditingCategory(null)
        fetchCategories()
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to update category")
      }
    } catch (error) {
      console.error('Error updating category:', error)
      toast.error("Failed to update category")
    }
  }

  const deleteCategory = async (categoryId: string) => {
    try {
      const response = await fetch('/api/expenses/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [categoryId] })
      })

      if (response.ok) {
        toast.success("Category deleted successfully!")
        fetchCategories()
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to delete category")
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error("Failed to delete category")
    }
  }

  const toggleCategoryStatus = async (category: Category) => {
    try {
      const response = await fetch(`/api/expenses/categories`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ids: [category._id],
          updates: { isActive: !category.isActive }
        })
      })

      if (response.ok) {
        toast.success(`Category ${!category.isActive ? 'activated' : 'deactivated'}!`)
        fetchCategories()
      }
    } catch (error) {
      console.error('Error toggling category status:', error)
      toast.error("Failed to update category status")
    }
  }

  const createDefaultCategories = async () => {
    try {
      const response = await fetch('/api/expenses/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          categories: defaultCategories.map(cat => ({
            ...cat,
            keywords: cat.name.toLowerCase().split(' ')
          }))
        })
      })

      if (response.ok) {
        toast.success("Default categories created!")
        fetchCategories()
      }
    } catch (error) {
      console.error('Error creating default categories:', error)
      toast.error("Failed to create default categories")
    }
  }

  // Filter categories
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && category.isActive) ||
                         (filterStatus === 'inactive' && !category.isActive)
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-6 py-6">
          <div className="px-4 lg:px-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 py-6">
        
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Expense Categories</h1>
              <p className="text-muted-foreground">
                Manage and organize your expense categories for better tracking
              </p>
            </div>
            <div className="flex gap-2">
              {categories.length === 0 && (
                <Button onClick={createDefaultCategories} variant="outline">
                  Create Default Categories
                </Button>
              )}
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                    <DialogDescription>
                      Add a new expense category to organize your transactions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                        placeholder="e.g., Food & Dining"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                        placeholder="Brief description of this category"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="color"
                            type="color"
                            value={newCategory.color}
                            onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                            className="w-12 h-10 p-1 rounded"
                          />
                          <Input
                            value={newCategory.color}
                            onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                            placeholder="#3b82f6"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon (Emoji)</Label>
                        <Input
                          id="icon"
                          value={newCategory.icon}
                          onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                          placeholder="🍽️"
                          maxLength={2}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                      <Input
                        id="keywords"
                        value={newCategory.keywords}
                        onChange={(e) => setNewCategory({...newCategory, keywords: e.target.value})}
                        placeholder="food, dining, restaurant, takeout"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      onClick={createCategory}
                      disabled={!newCategory.name.trim()}
                    >
                      Create Category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-4 lg:px-6">
          {filteredCategories.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Folder className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No categories found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {categories.length === 0 
                    ? "Get started by creating your first expense category."
                    : "No categories match your current search or filter."
                  }
                </p>
                {categories.length === 0 && (
                  <Button onClick={createDefaultCategories} variant="outline">
                    Create Default Categories
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCategories.map((category) => (
                <Card key={category._id} className="relative group">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                          style={{ backgroundColor: category.color }}
                        >
                          {category.icon || <Tag className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={category.isActive ? "default" : "secondary"} className="text-xs">
                              {category.isActive ? "Active" : "Inactive"}
                            </Badge>
                            {category.usageCount && (
                              <Badge variant="outline" className="text-xs">
                                {category.usageCount} uses
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setEditingCategory(category)
                            setIsEditDialogOpen(true)
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleCategoryStatus(category)}>
                            {category.isActive ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => deleteCategory(category._id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.description && (
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      )}
                      
                      {category.keywords && category.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {category.keywords.slice(0, 3).map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                          {category.keywords.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{category.keywords.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {category.totalAmount && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total spent:</span>
                          <span className="font-medium">₹{category.totalAmount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Edit Category Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Make changes to your expense category.
              </DialogDescription>
            </DialogHeader>
            {editingCategory && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name *</Label>
                  <Input
                    id="edit-name"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingCategory.description || ''}
                    onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-color">Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="edit-color"
                        type="color"
                        value={editingCategory.color}
                        onChange={(e) => setEditingCategory({...editingCategory, color: e.target.value})}
                        className="w-12 h-10 p-1 rounded"
                      />
                      <Input
                        value={editingCategory.color}
                        onChange={(e) => setEditingCategory({...editingCategory, color: e.target.value})}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-icon">Icon (Emoji)</Label>
                    <Input
                      id="edit-icon"
                      value={editingCategory.icon || ''}
                      onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
                      maxLength={2}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="edit-keywords"
                    value={editingCategory.keywords?.join(', ') || ''}
                    onChange={(e) => setEditingCategory({
                      ...editingCategory, 
                      keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                    })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-active"
                    checked={editingCategory.isActive}
                    onCheckedChange={(checked) => setEditingCategory({...editingCategory, isActive: checked})}
                  />
                  <Label htmlFor="edit-active">Active</Label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={updateCategory}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
