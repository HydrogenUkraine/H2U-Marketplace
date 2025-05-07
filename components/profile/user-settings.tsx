"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UserSettings() {
  const [notifications, setNotifications] = useState({
    bidUpdates: true,
    transportUpdates: true,
    marketAlerts: false,
    priceAlerts: true,
    newsletter: false,
  })

  return (
    <Tabs defaultValue="account" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="wallet">Wallet</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input id="company" defaultValue="Green Energy Corp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Primary Role</Label>
                <Select defaultValue="buyer">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="producer">Producer</SelectItem>
                    <SelectItem value="transporter">Transporter</SelectItem>
                    <SelectItem value="multiple">Multiple Roles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="bio">Bio / Description</Label>
              <textarea
                id="bio"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell us about yourself or your company"
                defaultValue="Hydrogen buyer and clean energy enthusiast. Looking for sustainable hydrogen sources for our manufacturing processes."
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Account Preferences</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="public-profile" className="flex flex-col space-y-1">
                    <span>Public Profile</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Allow others to see your profile information
                    </span>
                  </Label>
                  <Switch id="public-profile" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                    <span>Two-Factor Authentication</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Add an extra layer of security to your account
                    </span>
                  </Label>
                  <Switch id="two-factor" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Marketplace Notifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="bid-updates" className="flex flex-col space-y-1">
                    <span>Bid Updates</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive notifications about your bids
                    </span>
                  </Label>
                  <Switch
                    id="bid-updates"
                    checked={notifications.bidUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, bidUpdates: checked })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="market-alerts" className="flex flex-col space-y-1">
                    <span>Market Alerts</span>
                    <span className="font-normal text-xs text-muted-foreground">Get notified about new listings</span>
                  </Label>
                  <Switch
                    id="market-alerts"
                    checked={notifications.marketAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="price-alerts" className="flex flex-col space-y-1">
                    <span>Price Alerts</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Notifications when prices change significantly
                    </span>
                  </Label>
                  <Switch
                    id="price-alerts"
                    checked={notifications.priceAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, priceAlerts: checked })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Transport Notifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="transport-updates" className="flex flex-col space-y-1">
                    <span>Transport Updates</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Get notified about transport status changes
                    </span>
                  </Label>
                  <Switch
                    id="transport-updates"
                    checked={notifications.transportUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, transportUpdates: checked })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Communication Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="newsletter" className="flex flex-col space-y-1">
                    <span>Newsletter</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive our monthly hydrogen market newsletter
                    </span>
                  </Label>
                  <Switch
                    id="newsletter"
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="wallet">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Settings</CardTitle>
            <CardDescription>Manage your connected wallet and payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg border bg-muted/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-medium">Connected Wallet</h3>
                  <p className="text-sm text-muted-foreground">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
                </div>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-950">
                  Connected
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Wallet Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-sign" className="flex flex-col space-y-1">
                    <span>Auto-Sign Transactions</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Automatically sign transactions under 100 units
                    </span>
                  </Label>
                  <Switch id="auto-sign" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="transaction-notifications" className="flex flex-col space-y-1">
                    <span>Transaction Notifications</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Get notified about wallet transactions
                    </span>
                  </Label>
                  <Switch id="transaction-notifications" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Transaction History</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted">
                    <div>
                      <p className="text-sm font-medium">
                        {i === 1 ? "Hydrogen Purchase" : i === 2 ? "Bid Placed" : "Listing Fee"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i === 1 ? "Lot #1003" : i === 2 ? "Lot #1005" : "Lot #2001"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${i === 3 ? "text-red-500" : ""}`}>
                        {i === 1 ? "-750.00" : i === 2 ? "Pending" : "-25.00"}
                      </p>
                      <p className="text-xs text-muted-foreground">{i}d ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Disconnect Wallet</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
