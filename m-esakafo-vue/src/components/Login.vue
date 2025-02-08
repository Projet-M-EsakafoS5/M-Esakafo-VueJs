<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div class="p-8 space-y-6">
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Se Connecter</h2>
                </div>

                <form class="space-y-4">
                    <div>
                        <label for="email" class="block mb-2 text-gray-700 dark:text-gray-200">Email</label>
                        <div class="relative">
                            <input type="email" id="email" placeholder="exemple@gmail.com"
                                class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
                            <!-- Icon -->
                            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                📧
                            </span>
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block mb-2 text-gray-700 dark:text-gray-200">Password</label>
                        <div class="relative">
                            <input type="password" id="password" placeholder="mot de passe"
                                class="pl-10 pr-12 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
                            <!-- Icon -->
                            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                🔒
                            </span>
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    </div>


</template>