import React from "react";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Sayfanın ana içeriği */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-200">
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
