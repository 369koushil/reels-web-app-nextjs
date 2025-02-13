import { getProviders, signIn } from "next-auth/react";

const ProviderBtnLogin = async () => {
    const providers = await getProviders();

    return (
        <div>
            {providers &&
                Object.values(providers).map((provider) => (
                    <button className="px-12 py-4 rounded-xl text-white font-semibold text-lg bg-blue-900 hover:bg-blue-950"
                        key={provider.id} onClick={() => signIn(provider.id)}>
                        Login in with {provider.name}
                    </button>
                ))}
        </div>
    );
};

export default ProviderBtnLogin;
