import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "./main-nav";
import NavbarActions from "./navbar-actions";
import getCoffeeBrands from "@/actions/get-coffeeBrands";

export const revalidate = 0; // categories are never cached, meaning it will get call every time.

const Navbar = async () => {
  const coffeeBrands = await getCoffeeBrands();
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">Store</p>
          </Link>
          <MainNav data={coffeeBrands} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
