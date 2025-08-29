"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Music, Users, Sparkles } from "lucide-react";
import { useState } from "react";

const UserTypeSchema = z.object({
  userType: z.enum(["fan", "artist", "later"], {
    message: "Please select an account type.",
  }),
});

interface UserTypeFormProps {
  onSubmit: (userType: string) => Promise<void>;
}

export function UserTypeForm({ onSubmit }: UserTypeFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserTypeSchema>>({
    resolver: zodResolver(UserTypeSchema),
    defaultValues: {
      userType: "fan",
    },
  });

  async function handleSubmit(values: z.infer<typeof UserTypeSchema>) {
    setIsLoading(true);
    try {
      await onSubmit(values.userType);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Choisissez votre type de compte</CardTitle>
          <CardDescription>
            Sélectionnez le type de compte qui correspond le mieux à vos besoins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <RadioGroupItem value="fan" id="fan" />
                          <Label
                            htmlFor="fan"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="h-4 w-4 text-blue-500" />
                              <span className="font-medium">Fan</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Découvrez et appréciez les paroles de vos artistes
                              préférés
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <RadioGroupItem value="artist" id="artist" />
                          <Label
                            htmlFor="artist"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Music className="h-4 w-4 text-purple-500" />
                              <span className="font-medium">Artiste</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Partagez vos paroles et connectez-vous avec vos
                              fans
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <RadioGroupItem value="later" id="later" />
                          <Label
                            htmlFor="later"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkles className="h-4 w-4 text-amber-500" />
                              <span className="font-medium">Plus tard</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Je déciderai plus tard, laissez-moi explorer
                              d'abord
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Configuration en cours...
                  </>
                ) : (
                  "Continuer"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
