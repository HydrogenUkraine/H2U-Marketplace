import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bell, Edit, Wallet, Droplets, Zap } from "lucide-react"
import UserNFTs from "@/components/profile/user-nfts"
import TransportStatus from "@/components/profile/transport-status"
import UserSettings from "@/components/profile/user-settings"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function ProfilePage() {
  return (
    <AuthGuard>
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your account and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Buyer & Producer</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
                    Verified
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-950">
                    Active
                  </Badge>
                </div>

                <div className="flex items-center mt-4 text-sm text-muted-foreground">
                  <Wallet className="h-4 w-4 mr-1" />
                  <span>0x71C...93E2</span>
                </div>

                <Button variant="outline" className="mt-4 w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                      <Droplets className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Hydrogen Owned</p>
                      <p className="text-xs text-muted-foreground">Total amount</p>
                    </div>
                  </div>
                  <p className="font-bold">125 kg</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Energy Certificates</p>
                      <p className="text-xs text-muted-foreground">Total burned</p>
                    </div>
                  </div>
                  <p className="font-bold">15</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Notifications</p>
                      <p className="text-xs text-muted-foreground">Unread alerts</p>
                    </div>
                  </div>
                  <Badge>3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>Recent transactions and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={`mr-2 h-2 w-2 rounded-full ${i % 3 === 0 ? "bg-green-500" : i % 3 === 1 ? "bg-blue-500" : "bg-orange-500"}`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {i % 3 === 0 ? "Bid Placed" : i % 3 === 1 ? "Hydrogen Purchased" : "Transport Started"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i % 3 === 0
                          ? "15 kg at 12.5/kg"
                          : i % 3 === 1
                            ? "25 kg for 375 total"
                            : "Estimated delivery in 3 days"}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">{i}d ago</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="nfts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="nfts">Hydrogen NFTs</TabsTrigger>
              <TabsTrigger value="transport">Transport Status</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="nfts" className="space-y-6">
              <UserNFTs />
            </TabsContent>

            <TabsContent value="transport" className="space-y-6">
              <TransportStatus />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <UserSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    </AuthGuard>
  )
}
