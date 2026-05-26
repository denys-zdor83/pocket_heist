// preview page for newly created UI components
import Skeleton from "@/components/Skeleton"
import Avatar from "@/components/Avatar"

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>

      <h3 className="mt-8 mb-4">Skeleton</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>

      <h3 className="mt-8 mb-4">Avatar</h3>
      <div className="flex items-center gap-4">
        <Avatar name="alice" />
        <Avatar name="John" />
        <Avatar name="PocketHeist" />
        <Avatar name="JohnDoe" />
      </div>
    </div>
  )
}
