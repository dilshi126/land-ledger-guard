import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { LandForm } from '@/components/deeds/LandForm';
import { OwnerForm } from '@/components/deeds/OwnerForm';
import { DeedForm } from '@/components/deeds/DeedForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { registerLand, registerOwner, registerDeed } from '@/lib/deedStorage';
import { Land, Owner, Deed } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

const DeedsPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLandSubmit = async (data: Land) => {
    setIsLoading(true);
    try {
      registerLand(data);
      toast({
        title: "Success",
        description: `Land ${data.landNumber} registered successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOwnerSubmit = async (data: Owner) => {
    setIsLoading(true);
    try {
      registerOwner(data);
      toast({
        title: "Success",
        description: `Owner ${data.fullName} registered successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeedSubmit = async (data: Deed) => {
    setIsLoading(true);
    try {
      registerDeed(data);
      toast({
        title: "Success",
        description: `Deed ${data.deedNumber} registered successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Registry Management
          </h1>
          <p className="text-muted-foreground">
            Register new lands, owners, and deeds into the system.
          </p>
        </div>

        <Tabs defaultValue="land" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="land">Register Land</TabsTrigger>
            <TabsTrigger value="owner">Register Owner</TabsTrigger>
            <TabsTrigger value="deed">Register Deed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="land">
            <Card>
              <CardHeader>
                <CardTitle>Land Registration</CardTitle>
                <CardDescription>
                  Enter details for a new land parcel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LandForm onSubmit={handleLandSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="owner">
            <Card>
              <CardHeader>
                <CardTitle>Owner Registration</CardTitle>
                <CardDescription>
                  Register a new land owner in the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OwnerForm onSubmit={handleOwnerSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deed">
            <Card>
              <CardHeader>
                <CardTitle>Deed Registration</CardTitle>
                <CardDescription>
                  Create a new deed linking a land to an owner.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DeedForm onSubmit={handleDeedSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DeedsPage;
