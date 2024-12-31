import React from "react";
import Footer from "./Footer";

function Layout({children}) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                {children}
            </main>
            <footer className="bg-gray-200 h-16">
                <Footer/>
            </footer>
        </div>
    );
}

export default Layout;
