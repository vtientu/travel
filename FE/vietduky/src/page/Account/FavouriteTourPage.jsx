import FavouriteTourCard from "@/components/Account/FavouriteTour/FavouriteTour";
import FavouriteTour from "@/components/Landing/FavouriteTour/FavouriteTour";
import LayoutAccountService from "@/layouts/LayoutAccountService";
import React from "react";

const FavouriteTourPage = () => {
  return (
    <LayoutAccountService>
      <div className="p-6">
        <div className="space-y-6">
          <FavouriteTourCard />
        </div>
      </div>
    </LayoutAccountService>
  );
};

export default FavouriteTourPage;
