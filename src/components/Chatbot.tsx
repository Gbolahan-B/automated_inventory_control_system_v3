import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Torya, your AI inventory assistant. I\'m currently in demo mode. Ask me about inventory management, stock levels, or how to use this system!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getDemoResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Demo responses based on keywords
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! How can I assist you with your inventory today?';
    }
    
    if (lowerMessage.includes('low stock') || lowerMessage.includes('reorder')) {
      return 'To check low stock items, navigate to the Dashboard. Products with stock at or below their reorder level will show a red alert icon. You can also view the Reports page for a detailed low stock report.';
    }
    
    if (lowerMessage.includes('add product') || lowerMessage.includes('new product')) {
      return 'To add a new product, click "Add Product" from the navigation menu. Fill in the product details including name, SKU, category, quantity, price, and reorder level. The system will automatically generate a SKU based on the product name, but you can customize it.';
    }
    
    if (lowerMessage.includes('update stock') || lowerMessage.includes('restock') || lowerMessage.includes('sell')) {
      return 'You can update stock in two ways: 1) Use the quick action buttons (Restock/Sell) directly from the Dashboard product table, or 2) Navigate to "Update Stock" page, select a product, choose the action type, and enter the quantity.';
    }
    
    if (lowerMessage.includes('report') || lowerMessage.includes('analytics')) {
      return 'The Reports page provides visual insights including stock level charts, product value charts, and low stock reports. You can also export your data in CSV, Excel, or PDF formats for external analysis.';
    }
    
    if (lowerMessage.includes('delete') || lowerMessage.includes('remove product')) {
      return 'To delete a product, click the trash icon in the product table on the Dashboard, or use the delete button in the product details view. You\'ll be asked to confirm before the product is permanently removed.';
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('naira') || lowerMessage.includes('currency')) {
      return 'All prices in this system are displayed in Nigerian Naira (₦). You can set the unit price when adding or editing products. The total stock value is automatically calculated as quantity × price.';
    }
    
    if (lowerMessage.includes('category') || lowerMessage.includes('categories')) {
      return 'Products can be organized by categories such as Electronics, Clothing, Food, Books, Furniture, and more. You can select a category when adding or editing a product. The Reports page shows category distribution.';
    }
    
    if (lowerMessage.includes('search') || lowerMessage.includes('find product')) {
      return 'Use the search bar at the top of the page to find products by name or SKU. The search works in real-time and filters the product list as you type.';
    }
    
    if (lowerMessage.includes('settings') || lowerMessage.includes('profile')) {
      return 'Access Settings from the navigation menu to manage your profile, security settings (password, 2FA, sessions), notification preferences, and system settings like default reorder levels and date formats.';
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('guide') || lowerMessage.includes('how to')) {
      return 'For detailed instructions on using the system, go to Settings → Help & User Guide. You\'ll find comprehensive documentation on all features, best practices, and troubleshooting tips.';
    }
    
    if (lowerMessage.includes('data') || lowerMessage.includes('privacy') || lowerMessage.includes('security')) {
      return 'Your data is completely isolated and private. Each user has their own separate database, so your inventory information is never shared with other users. All data transmission is encrypted for security.';
    }
    
    if (lowerMessage.includes('export') || lowerMessage.includes('download')) {
      return 'You can export your inventory data from the Reports page. Choose from CSV, Excel, or PDF formats. This is useful for backups, external analysis, or sharing reports.';
    }
    
    if (lowerMessage.includes('notification') || lowerMessage.includes('alert')) {
      return 'Configure notification preferences in Settings → Notification Settings. You can enable alerts for low stock warnings, daily reports, and stock updates.';
    }
    
    if (lowerMessage.includes('edit product') || lowerMessage.includes('modify')) {
      return 'To edit a product, click the edit icon in the product table, or view the product details and click "Edit Product". You can modify the name, SKU, category, price, reorder level, and description.';
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re welcome! Feel free to ask me anything else about managing your inventory.';
    }
    
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('overview')) {
      return 'The Dashboard provides a quick overview with summary cards showing total products, stock value, low stock items, and out of stock products. Below that is a detailed product table with all your inventory items and quick action buttons.';
    }

    if (lowerMessage.includes('what can you do') || lowerMessage.includes('capabilities') || lowerMessage.includes('features')) {
      return 'I\'m currently in demo mode! I can answer questions about inventory management, explain how to use features like adding products, updating stock, viewing reports, managing settings, and more. In the future, I\'ll be able to perform actions like creating products, updating stock levels, and generating reports directly through chat!';
    }

    // Default response
    return 'I\'m in demo mode right now and learning to help you better! I can answer questions about inventory management, stock updates, reports, and how to use this system. Try asking me about adding products, checking low stock, or using the reports feature. For comprehensive help, visit Settings → Help & User Guide.';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking and responding
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getDemoResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] z-50 shadow-2xl rounded-lg overflow-hidden">
          <Card className="h-full flex flex-col">
            <CardHeader className="bg-black text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Torya</CardTitle>
                    <p className="text-xs text-white/80 mt-1">Demo Mode</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {message.sender === 'bot' && (
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="w-4 h-4 text-gray-700" />
                            <span className="text-xs font-medium text-gray-700">Torya</span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-gray-700" />
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about inventory..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Demo mode - Responses are pre-programmed examples
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-black hover:bg-gray-800 text-white z-50 flex items-center justify-center"
        aria-label="Open Torya - AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Sparkles className="w-6 h-6 text-white" />
        )}
      </Button>
    </>
  );
}