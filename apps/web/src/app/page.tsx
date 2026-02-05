export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-4">앙상블 (Ensemble)</h1>
        <p className="text-center text-lg mb-8">음악 동호인을 위한 워크스페이스 기반 SaaS</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">합주 관리</h2>
            <p className="text-gray-600">효율적인 합주 일정 및 진행 관리</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">연습 트래킹</h2>
            <p className="text-gray-600">개인 및 그룹 연습 기록 관리</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">멤버 모집</h2>
            <p className="text-gray-600">새로운 멤버 모집 및 관리</p>
          </div>
        </div>
      </div>
    </main>
  );
}
