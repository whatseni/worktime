export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-blue-800 text-2xl font-bold mb-6 text-center italic">Admin</h2>
      <div className="text-center mt-6 text-2xl font-bold text-gray-600">
        발급받은 계정으로 로그인해주세요.
      </div>
      <p className="mt-2 text-center text-sm text-gray-600">
        계정이 없다면 최종 관리자에게 문의해주세요.
      </p>
      <form className="space-y-4 mt-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="your@email.com"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
  
        <button className="w-full bg-blue-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          로그인
        </button>
      </form>
    </div>
  </div>
  )
}