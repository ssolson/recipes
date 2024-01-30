import AddForm from '@/app/upload/components/add-recipe';
// import ListSong from '@/components/list-song';

export default function Page() {
  return (
    <main className="antialiased min-h-screen mx-auto max-w-6xl pt-10">
      <div className="grid grid-cols-4 gap-4">
        <AddForm />
        {/* <ListSong /> */}
      </div>
    </main>
  );
}
