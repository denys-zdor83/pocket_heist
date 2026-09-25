// preview page for newly created UI components

import Avatar from "@/components/Avatar"

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>

      <section className="mt-6">
        <h3>Avatar</h3>
        <div className="flex gap-4 mt-2">
          <Avatar name="alice" />
          <Avatar name="JohnDoe" />
          <Avatar name="JaneSmith" />
          <Avatar name="PocketHeist" />
          <Avatar name="bob" />
        </div>
      </section>
    </div>
  )
}
