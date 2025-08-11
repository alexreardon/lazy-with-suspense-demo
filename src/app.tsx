import { lazy, Suspense, useState } from 'react';

function delay<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, 2000);
  });
}

const LazyContent = lazy(() => delay(() => import('./content')));

export function App() {
  const [isShowingLazy, setIsShowingLazy] = useState<boolean>(false);

  return (
    <div className="p-4">
      <span className="text-slate-800 font-bold text-left">(App boundary)</span>
      <div className="flex flex-col gap-4 text-center p-4 border-2 rounded border-slate-400">
        <div className="bg-slate-300 rounded p-2 h-16">
          <span className="invisible">Some non-lazy loaded content</span>
        </div>

        <button
          type="button"
          className="border-2 rounded bg-blue-100 border-blue-400 rounded p-2 hover:bg-blue-200 active:bg-blue-300"
          onClick={() => setIsShowingLazy(true)}
        >
          Add lazy content
        </button>

        <div className="flex flex-col">
          <span className="text-purple-800 font-bold text-left">
            (Suspense boundary)
          </span>
          <div className="flex flex-col gap-4 p-4 border-2 rounded border-purple-400 border-dashed">
            {isShowingLazy ? (
              <Suspense
                fallback={
                  <span className="bg-purple-100 rounded p-2">Loading...</span>
                }
              >
                <LazyContent />
              </Suspense>
            ) : (
              <span className="bg-red-100 rounded p-2">
                Lazy content: <i>not loaded</i>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
