import AllUsers from "./(components)/all-users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyFriends from "./(components)/my-friends";
import PendingUsers from "./(components)/pending-users";

const Friends = () => {
    return (
        <div className="flex flex-col p-[3vw] mx-auto mt-10 mb-20 bg-[#f9f9f9] w-[80vw] lg:w-[45vw] rounded-xl shadow-lg gap-y-3">
            <div className="min-h-[100px]">
                <Tabs defaultValue="my-friends" className="w-full">
                <TabsList className="m-auto">
                    <TabsTrigger value="all-users">All users</TabsTrigger>
                    <TabsTrigger value="my-friends">My friends</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                    <TabsContent value="all-users">
                        <AllUsers />
                    </TabsContent>
                    <TabsContent value="my-friends">
                        <MyFriends />
                    </TabsContent>
                    <TabsContent value="pending">
                        <PendingUsers />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
     );
}
 
export default Friends;