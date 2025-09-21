import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "@/lib/auth";

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T | null;
}

interface JwtAuthData {
	accessToken: string;
	tokenType: string;
	user: {
		id: number;
		username: string;
		email: string;
	};
}

interface LoginResponse extends ApiResponse<JwtAuthData> {}

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		try {
			const res = await fetch("http://localhost:8080/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data: LoginResponse = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Login failed");
			}

			if (data.data) {
				// Store JWT token and user data
				setToken(data.data.accessToken);
				setUser(data.data.user);
				
				console.log("Logged in:", data);
				// Redirect to home page or dashboard
				navigate("/dashboard");
			}
		} catch (err) {
			console.error("Login error:", err);
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Something went wrong");
			}
		}
	};

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={handleSubmit}
			{...props}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-xl font-medium">Login to your account</h1>
				<p className="text-muted-foreground text-sm text-balance">
					Enter your email below to login to your account
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-3">
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="username"
						required
					/>
				</div>
				<div className="grid gap-3">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
						<a
							href="#"
							className="ml-auto text-sm underline-offset-4 hover:underline"
						>
							Forgot your password?
						</a>
					</div>
					<Input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<Button type="submit" className="w-full">
					Login
				</Button>

				{error && <p className="text-red-500 text-sm">{error}</p>}
			</div>
			<div className="text-center text-sm">
				Don't have an account?{" "}
				<Link to="/signup" className="underline underline-offset-4">
					Sign up
				</Link>
			</div>
		</form>
	);
}
