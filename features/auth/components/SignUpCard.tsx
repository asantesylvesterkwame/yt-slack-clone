import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AuthFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";

interface SignUpCardProps {
  setAuthFlow: (authFlow: AuthFlow) => void;
}

const SignUpCard = ({ setAuthFlow }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);

  const handlePasswordSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }
    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch((error) => {
        console.error("Error signing in:", error);
        toast.error(
          "Error signing up. Please check your credentials and try again.",
        );
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handleOAuthSignUp = async (provider: "google" | "github") => {
    setPending(true);
    signIn(provider).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign Up to Continue</CardTitle>
        <CardDescription>
          Enter your email or use another provider to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={handlePasswordSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
            <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            type="submit"
            className="w-full relative"
            size="lg"
            disabled={pending}
            variant="outline"
            onClick={()=> handleOAuthSignUp("google")}
          >
            <FcGoogle className="size-5 absolute left-2.5 top-2.5" />
            Continue with Google
          </Button>
          <Button
            type="submit"
            className="w-full relative"
            size="lg"
            disabled={pending}
            variant="outline"
            onClick={()=> handleOAuthSignUp("github")}
          >
            <FaGithub className="size-5 absolute left-2.5 top-2.5" />
            Continue with Github
          </Button>
        </div>
        <p
          onClick={() => setAuthFlow("signIn")}
          className="text-xs text-muted-foreground"
        >
          Already have an account?{" "}
          <span className="text-sky-700 hover:underline cursor-pointer">
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
