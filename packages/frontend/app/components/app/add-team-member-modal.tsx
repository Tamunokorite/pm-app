import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { AddTeamMemberForm } from "./add-team-member-form";
import { useState } from "react";


export function AddTeamMemberModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new team member.
          </DialogDescription>
        </DialogHeader>
        <AddTeamMemberForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}