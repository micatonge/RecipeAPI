import React, { ReactNode, useState } from "react";
import Image from "next/image";
import SearchBar from "./searchbar";

interface PageLayoutProps {
  children: ReactNode;
  onSearch: (query: string) => void;
  showSpecialDiets?: boolean;
  onVeganClick?: () => void;
  onVegetarianClick?: () => void;
  onGlutenFreeClick?: () => void;
  onHomeClick?: () => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  onSearch,
  showSpecialDiets = true,
  onVeganClick,
  onVegetarianClick,
  onGlutenFreeClick,
  onHomeClick,
}) => {
  // Handler function for search
  const handleSearch = (query: string) => {
    onSearch(query);
  };

  // Handler function for clicking home icon
  const handleHomeClick = () => {
    console.log("Home icon clicked!");
    if (onHomeClick) {
      onHomeClick();
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "35vh",
            zIndex: 0,
          }}
        >
          <Image
            src="/images/stock1.jpg"
            alt="Your Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "35vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="/images/homeWCW.png"
            alt="Home Icon"
            style={{
              position: "absolute",
              top: "30px",
              left: "30px",
              width: "30px",
              height: "30px",
              cursor: "pointer",
            }}
            onClick={handleHomeClick}
          />
          <h1
            style={{
              color: "white",
              fontSize: "2rem",
              textAlign: "center",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            What do you want to cook?{" "}
          </h1>
          <div style={{ paddingLeft: "20px" }}>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        {/* Special Diets section */}
        {showSpecialDiets && (
          <div
            style={{
              position: "fixed",
              top: "35vh",
              width: "100%",
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                color: "black",
                fontWeight: "400",
                marginBottom: "1rem",
                marginLeft: "-1000px",
                marginTop: "1rem",
              }}
            >
              Special Diets
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
                marginTop: "90px",
              }}
            >
              <img
                src="/images/vegan.png"
                alt="Vegan Icon"
                style={{
                  width: "70px",
                  height: "70px",
                  marginRight: "200px",
                  cursor: "pointer",
                }}
                title="Vegan"
                onClick={onVeganClick}
              />
              <img
                src="/images/vegetable.png"
                alt="Vegetarian Icon"
                style={{
                  width: "70px",
                  height: "70px",
                  marginRight: "200px",
                  cursor: "pointer",
                }}
                title="Vegetarian"
                onClick={onVegetarianClick}
              />
              <img
                src="/images/gluten-free.png"
                alt="Gluten-Free Icon"
                style={{ width: "70px", height: "70px", cursor: "pointer" }}
                title="Gluten-Free"
                onClick={onGlutenFreeClick}
              />
            </div>
          </div>
        )}
        {/* Main content */}
        <div
          style={{
            paddingTop: "30vh",
            paddingBottom: "120px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      </div>
      {/* Footer */}
      <div
        style={{
          position: "relative",
          bottom: 0,
          marginTop: "-70px",
          width: "100%",
          backgroundColor: "red",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="https://github.com/micatonge/WC">
            <img
              src="/images/github-logo.png"
              alt="GitHub Icon"
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
          </a>
          <a href="https://www.linkedin.com/in/micatonge/">
            <img
              src="/images/linkedin-logo.png"
              alt="LinkedIn Icon"
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
          </a>
        </div>
        <div>
          <p>Data provided by spoonacular API</p>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
