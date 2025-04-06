"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema including subdomain
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  contact: z.string().min(1, "Contact is required"),
  subdomain: z.string().min(1, "Subdomain is required"),
});

export default function AdminPage() {
  const [mode, setMode] = useState<"edit" | "add">("edit");
  const [school, setSchool] = useState({
    name: "",
    description: "",
    contact: "",
    subdomain: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (mode === "edit") {
      const sub = window.location.hostname.split(".")[0];
      fetch(`/api/school-info?school=${sub}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setSchool({ ...data, subdomain: sub });
          }
        });
    } else {
      setSchool({ name: "", description: "", contact: "", subdomain: "" });
    }
    setErrors({});
  }, [mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSchool({ ...school, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = schema.safeParse(school);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors");
      return;
    }

    try {
      const res = await fetch(
        mode === "edit" ? "/api/update-school" : "/api/add-school",
        {
          method: mode === "edit" ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(school),
        }
      );

      if (res.ok) {
        toast.success(mode === "edit" ? "School updated!" : "School added!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Failed to submit!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-4 flex items-center gap-4">
        <label>
          <input
            type="radio"
            value="edit"
            checked={mode === "edit"}
            onChange={() => setMode("edit")}
          />
          <span className="ml-1">Edit</span>
        </label>
        <label>
          <input
            type="radio"
            value="add"
            checked={mode === "add"}
            onChange={() => setMode("add")}
          />
          <span className="ml-1">Add</span>
        </label>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        {mode === "edit" ? "Edit School Info" : "Add New School"}
      </h1>

      <Input
        name="name"
        value={school.name}
        onChange={handleChange}
        placeholder="Name"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <Textarea
        name="description"
        value={school.description}
        onChange={handleChange}
        placeholder="Description"
        className="mt-3"
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description}</p>
      )}

      <Input
        name="contact"
        value={school.contact}
        onChange={handleChange}
        placeholder="Contact"
        className="mt-3"
      />
      {errors.contact && (
        <p className="text-red-500 text-sm">{errors.contact}</p>
      )}

      <Input
        name="subdomain"
        value={school.subdomain}
        onChange={handleChange}
        placeholder="Subdomain"
        className="mt-3"
        disabled={mode === "edit"} // optional: disable in edit mode
      />
      {errors.subdomain && (
        <p className="text-red-500 text-sm">{errors.subdomain}</p>
      )}

      <Button className="mt-6 w-full" onClick={handleSubmit}>
        {mode === "edit" ? "Update" : "Add"}
      </Button>
    </div>
  );
}
