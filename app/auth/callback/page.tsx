// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "@/lib/auth-client";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { createDefaultOrg, updateUserType } from "../auth.action";
// import { UserTypeForm } from "./user-type-form";

// export default function AuthCallback() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [needsUserType, setNeedsUserType] = useState(false);
//   const [isCheckingUserType, setIsCheckingUserType] = useState(true);

//   useEffect(() => {
//     const checkUserTypeNeeded = async () => {
//       if (!session?.user) return;

//       // Vérifier si l'utilisateur a déjà un type défini
//       // const isNewUser = !session.user.userType;

//       if (isNewUser) {
//         setNeedsUserType(true);
//       } else {
//         // L'utilisateur a déjà un type, on peut finaliser directement
//         await finalizeSignup();
//       }

//       setIsCheckingUserType(false);
//     };

//     checkUserTypeNeeded();
//   }, [session]);

//   const finalizeSignup = async () => {
//     if (isProcessing) return;

//     setIsProcessing(true);

//     try {
//       await createDefaultOrg();
//       router.push("/");
//     } catch (error) {
//       console.error("Erreur lors de la création de l'organisation:", error);
//       toast.error("Compte créé, mais erreur lors de la configuration");
//       router.push("/");
//     }
//   };

//   const handleUserTypeSubmit = async (userType: string) => {
//     try {
//       // Mettre à jour le userType dans la base de données
//       await updateUserType(userType);
//       console.log("User type selected:", userType);

//       toast.success("Type de compte configuré avec succès !");
//       await finalizeSignup();
//     } catch (error) {
//       console.error(
//         "Erreur lors de la configuration du type d'utilisateur:",
//         error
//       );
//       toast.error("Erreur lors de la configuration");
//     }
//   };

//   if (isCheckingUserType) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center space-y-4">
//           <Loader2 className="w-8 h-8 animate-spin mx-auto" />
//           <p className="text-sm text-muted-foreground">
//             Vérification de votre compte...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (needsUserType) {
//     return <UserTypeForm onSubmit={handleUserTypeSubmit} />;
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center space-y-4">
//         <Loader2 className="w-8 h-8 animate-spin mx-auto" />
//         <p className="text-sm text-muted-foreground">
//           Finalisation de votre compte...
//         </p>
//       </div>
//     </div>
//   );
// }
