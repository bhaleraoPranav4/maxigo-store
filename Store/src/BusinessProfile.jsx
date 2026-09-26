import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CircleMarker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./BusinessProfile.css";

function MapCenter({
  position,
}) {
  const map =
    useMap();

  useEffect(() => {
    if (!position)
      return;

    map.flyTo(
      [
        position.lat,
        position.lng,
      ],
      16,
      {
        duration: 0.8,
      }
    );
  }, [
    position,
    map,
  ]);

  return null;
}

function LocationClickHandler({
  onLocationSelect,
}) {
  useMapEvents({
    click(e) {
      onLocationSelect(
        e.latlng.lat,
        e.latlng.lng
      );
    },
  });

  return null;
}

function BusinessProfile({
  store,
  businessType,
  businessTypes,
  onSave,
}) {
  const defaultLocation =
    {
      lat: 19.1383,
      lng: 74.8394,
    };

  const initial =
    useMemo(
      () => ({
        storeCode:
          store?.storeCode ||
          "",

        businessName:
          store?.storeName ||
          "",

        ownerName:
          store?.ownerName ||
          store?.user?.name ||
          "",

        phone:
          store?.mobile ||
          store?.user?.mobile ||
          "",

        email:
          store?.email ||
          store?.user?.email ||
          "",

        address:
          store?.address ||
          "",

        city:
          store?.city ||
          "",

        state:
          store?.state ||
          "",

        pincode:
          store?.pincode ||
          "",

        latitude:
          store?.latitude ??
          "",

        longitude:
          store?.longitude ??
          "",

        openingTime:
          store?.openingTime ||
          "09:00",

        closingTime:
          store?.closingTime ||
          "22:00",

        logoUrl:
          store?.logoUrl ||
          "",

        category:
          store?.category ||
          businessType,
      }),
      [
        store,
        businessType,
      ]
    );

  const [profile, setProfile] =
    useState(initial);

  const [
    mapPosition,
    setMapPosition,
  ] = useState(() => {
    if (
      store?.latitude !=
        null &&
      store?.longitude !=
        null
    ) {
      return {
        lat: Number(
          store.latitude
        ),
        lng: Number(
          store.longitude
        ),
      };
    }

    return defaultLocation;
  });

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [message, setMessage] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    setProfile(
      initial
    );

    if (
      store?.latitude !=
        null &&
      store?.longitude !=
        null
    ) {
      setMapPosition({
        lat: Number(
          store.latitude
        ),
        lng: Number(
          store.longitude
        ),
      });
    }
  }, [
    initial,
    store,
  ]);

  const handleChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));

      setMessage("");
    };

  const reverseGeocode =
    async (
      lat,
      lng
    ) => {
      try {
        const response =
          await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
            {
              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Reverse geocoding failed"
          );
        }

        const data =
          await response.json();

        const address =
          data.address ||
          {};

        setProfile(
          (prev) => ({
            ...prev,

            address:
              data.display_name ||
              prev.address,

            city:
              address.city ||
              address.town ||
              address.village ||
              address.municipality ||
              prev.city,

            state:
              address.state ||
              prev.state,

            pincode:
              address.postcode ||
              prev.pincode,

            latitude:
              lat,

            longitude:
              lng,
          })
        );
      } catch {
        setProfile(
          (prev) => ({
            ...prev,

            latitude:
              lat,

            longitude:
              lng,
          })
        );
      }
    };

  const selectLocation =
    async (
      lat,
      lng
    ) => {
      setMapPosition({
        lat,
        lng,
      });

      setMessage(
        "Getting address..."
      );

      await reverseGeocode(
        lat,
        lng
      );

      setMessage(
        "Location selected successfully."
      );
    };

  const searchLocation =
    async (e) => {
      e.preventDefault();

      if (
        !searchText.trim()
      ) {
        setMessage(
          "Please enter a location."
        );

        return;
      }

      setMessage(
        "Searching location..."
      );

      try {
        const response =
          await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(
              searchText
            )}`,
            {
              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Location search failed"
          );
        }

        const results =
          await response.json();

        if (
          !results?.length
        ) {
          throw new Error(
            "Location not found"
          );
        }

        const lat =
          Number(
            results[0].lat
          );

        const lng =
          Number(
            results[0].lon
          );

        await selectLocation(
          lat,
          lng
        );

        setMessage(
          "Location found successfully."
        );
      } catch (error) {
        setMessage(
          error?.message ||
            "Unable to search location."
        );
      }
    };

  const currentLocation =
    () => {
      if (
        !navigator.geolocation
      ) {
        setMessage(
          "Geolocation is not supported by this browser."
        );

        return;
      }

      setMessage(
        "Getting your current location..."
      );

      navigator.geolocation.getCurrentPosition(
        async (
          position
        ) => {
          await selectLocation(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          setMessage(
            "Location permission denied or unavailable."
          );
        },
        {
          enableHighAccuracy:
            true,

          timeout:
            15000,

          maximumAge: 0,
        }
      );
    };

  const handleSave =
    async (e) => {
      e.preventDefault();

      if (
        !profile.businessName.trim()
      ) {
        setMessage(
          "Business name is required."
        );

        return;
      }

      if (
        !profile.ownerName.trim()
      ) {
        setMessage(
          "Owner name is required."
        );

        return;
      }

      if (
        !profile.phone.trim()
      ) {
        setMessage(
          "Phone number is required."
        );

        return;
      }

      if (
        !/^\d{6}$/.test(
          String(
            profile.pincode ||
              ""
          )
        )
      ) {
        setMessage(
          "Please enter a valid 6-digit pincode."
        );

        return;
      }

      if (
        !profile.address.trim()
      ) {
        setMessage(
          "Business address is required."
        );

        return;
      }

      setSaving(true);
      setMessage("");

      try {
        await onSave({
          storeCode:
            profile.storeCode ||
            null,

          storeName:
            profile.businessName.trim(),

          ownerName:
            profile.ownerName.trim(),

          mobile:
            profile.phone.trim(),

          email:
            profile.email.trim() ||
            null,

          logoUrl:
            profile.logoUrl.trim() ||
            null,

          address:
            profile.address.trim(),

          city:
            profile.city.trim() ||
            null,

          state:
            profile.state.trim() ||
            null,

          pincode:
            profile.pincode.trim(),

          latitude:
            profile.latitude ===
            ""
              ? null
              : Number(
                  profile.latitude
                ),

          longitude:
            profile.longitude ===
            ""
              ? null
              : Number(
                  profile.longitude
                ),

          category:
            profile.category,

          openingTime:
            profile.openingTime ||
            null,

          closingTime:
            profile.closingTime ||
            null,
        });

        setMessage(
          "✓ Changes saved successfully"
        );
      } catch (error) {
        setMessage(
          error?.message ||
            "Unable to save profile."
        );
      } finally {
        setSaving(false);
      }
    };

  return (
    <div className="business-profile-page">

      <div className="profile-page-header">

        <div>

          <h1>
            Business Profile
          </h1>

          <p>
            Manage your store
            information,
            location and
            operating details.
          </p>

        </div>

        {message && (
          <div className="profile-saved-message">
            {message}
          </div>
        )}

      </div>

      {/* BUSINESS TYPE */}

      <div className="profile-card business-type-card">

        <div className="profile-card-header">

          <div>

            <h2>
              Business Type
            </h2>

            <p>
              Your registered
              MaxiGo business
              category.
            </p>

          </div>

        </div>

        <div className="business-type-options">

          {businessTypes.map(
            ([
              value,
              label,
              icon,
            ]) => (
              <button
                key={value}
                type="button"
                className={
                  profile.category ===
                  value
                    ? "business-type-option active"
                    : "business-type-option"
                }
                disabled
              >

                <span className="business-type-emoji">
                  {icon}
                </span>

                <span className="business-type-name">
                  {label}
                </span>

                {profile.category ===
                  value && (
                  <span className="business-type-check">
                    ✓
                  </span>
                )}

              </button>
            )
          )}

        </div>

      </div>

      <form
        onSubmit={
          handleSave
        }
      >

        <div className="profile-layout">

          <div className="profile-left">

            {/* BASIC */}

            <div className="profile-card">

              <div className="profile-card-header">

                <div>

                  <h2>
                    Basic Information
                  </h2>

                  <p>
                    Your business
                    and owner
                    details.
                  </p>

                </div>

              </div>

              <div className="profile-form-grid">

                <div className="profile-form-group full">

                  <label>
                    Business Name{" "}
                    <span>
                      *
                    </span>
                  </label>

                  <input
                    name="businessName"
                    value={
                      profile.businessName
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    Owner Name{" "}
                    <span>
                      *
                    </span>
                  </label>

                  <input
                    name="ownerName"
                    value={
                      profile.ownerName
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    Phone Number{" "}
                    <span>
                      *
                    </span>
                  </label>

                  <input
                    name="phone"
                    maxLength="10"
                    inputMode="numeric"
                    value={
                      profile.phone
                    }
                    onChange={(e) =>
                      handleChange(
                        {
                          target: {
                            name:
                              "phone",
                            value:
                              e.target.value.replace(
                                /\D/g,
                                ""
                              ),
                          },
                        }
                      )
                    }
                  />

                </div>

                <div className="profile-form-group full">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      profile.email
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    Store Code
                  </label>

                  <input
                    name="storeCode"
                    value={
                      profile.storeCode
                    }
                    disabled
                    readOnly
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    Logo URL
                  </label>

                  <input
                    name="logoUrl"
                    value={
                      profile.logoUrl
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://..."
                  />

                </div>

              </div>

            </div>

            {/* ADDRESS */}

            <div className="profile-card">

              <div className="profile-card-header">

                <div>

                  <h2>
                    Business Address
                  </h2>

                  <p>
                    Location where
                    customers can
                    find your store.
                  </p>

                </div>

              </div>

              <div className="profile-form-grid">

                <div className="profile-form-group full">

                  <label>
                    Search Location
                  </label>

                  <div
                    style={{
                      display:
                        "flex",
                      gap: 8,
                    }}
                  >

                    <input
                      value={
                        searchText
                      }
                      onChange={(e) =>
                        setSearchText(
                          e.target.value
                        )
                      }
                      placeholder="Search address / area / city"
                    />

                    <button
                      type="button"
                      onClick={
                        searchLocation
                      }
                    >
                      Search
                    </button>

                  </div>

                </div>

                <div className="profile-form-group full">

                  <label>
                    Full Address{" "}
                    <span>
                      *
                    </span>
                  </label>

                  <textarea
                    name="address"
                    value={
                      profile.address
                    }
                    onChange={
                      handleChange
                    }
                    rows="3"
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    City
                  </label>

                  <input
                    name="city"
                    value={
                      profile.city
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    State
                  </label>

                  <input
                    name="state"
                    value={
                      profile.state
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    Pincode{" "}
                    <span>
                      *
                    </span>
                  </label>

                  <input
                    name="pincode"
                    maxLength="6"
                    inputMode="numeric"
                    value={
                      profile.pincode
                    }
                    onChange={(e) =>
                      handleChange(
                        {
                          target: {
                            name:
                              "pincode",
                            value:
                              e.target.value.replace(
                                /\D/g,
                                ""
                              ),
                          },
                        }
                      )
                    }
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    Latitude
                  </label>

                  <input
                    value={
                      profile.latitude
                    }
                    readOnly
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    Longitude
                  </label>

                  <input
                    value={
                      profile.longitude
                    }
                    readOnly
                  />

                </div>

                <div className="profile-form-group full">

                  <button
                    type="button"
                    onClick={
                      currentLocation
                    }
                  >
                    📍 Use Current
                    Location
                  </button>

                </div>

              </div>

              <div
                className="map-placeholder"
                style={{
                  height: 350,
                  padding: 0,
                  overflow:
                    "hidden",
                }}
              >

                <MapContainer
                  center={[
                    mapPosition.lat,
                    mapPosition.lng,
                  ]}
                  zoom={13}
                  style={{
                    width:
                      "100%",
                    height:
                      "100%",
                  }}
                >

                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <MapCenter
                    position={
                      mapPosition
                    }
                  />

                  <LocationClickHandler
                    onLocationSelect={
                      selectLocation
                    }
                  />

                  <CircleMarker
                    center={[
                      mapPosition.lat,
                      mapPosition.lng,
                    ]}
                    radius={10}
                    pathOptions={{
                      color:
                        "#5b2eff",
                      fillColor:
                        "#5b2eff",
                      fillOpacity:
                        0.8,
                    }}
                  />

                </MapContainer>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="profile-right">

            <div className="profile-card business-preview-card">

              <div className="profile-card-header">

                <div>

                  <h2>
                    Store Preview
                  </h2>

                  <p>
                    How your store
                    information
                    appears.
                  </p>

                </div>

              </div>

              <div className="preview-content">

                <span className="preview-label">
                  STORE
                </span>

                <h2>
                  {profile.businessName ||
                    "Your Store"}
                </h2>

                <div className="preview-type">
                  {
                    profile.category
                  }
                </div>

                <div className="preview-info">

                  <div>
                    📍{" "}
                    {profile.city ||
                      "City"}
                  </div>

                  <div>
                    📞{" "}
                    {profile.phone ||
                      "Mobile"}
                  </div>

                  <div>
                    🕒{" "}
                    {
                      profile.openingTime
                    }{" "}
                    -{" "}
                    {
                      profile.closingTime
                    }
                  </div>

                </div>

                <span className="preview-status">
                  {
                    store?.verificationStatus ||
                    "PENDING"
                  }
                </span>

              </div>

            </div>

            <div className="profile-card">

              <div className="profile-card-header">

                <div>

                  <h2>
                    Business Hours
                  </h2>

                  <p>
                    Regular operating
                    hours.
                  </p>

                </div>

              </div>

              <div className="profile-form-grid">

                <div className="profile-form-group">

                  <label>
                    Opening Time
                  </label>

                  <input
                    type="time"
                    name="openingTime"
                    value={
                      profile.openingTime
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="profile-form-group">

                  <label>
                    Closing Time
                  </label>

                  <input
                    type="time"
                    name="closingTime"
                    value={
                      profile.closingTime
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>

            </div>

            <div className="profile-card verification-card">

              <div className="verification-icon">
                ✓
              </div>

              <div>

                <h3>
                  Verification
                  Status
                </h3>

                <p>
                  {store?.verificationStatus ||
                    "PENDING"}
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="profile-save-bar">

          <div>

            <strong>
              Save your changes
            </strong>

            <span>
              Store profile
              updates are saved
              to the backend.
            </span>

          </div>

          <button
            type="submit"
            className="save-profile-btn"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "✓ Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default BusinessProfile;