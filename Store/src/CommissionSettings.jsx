import React, { useEffect, useState } from "react";
import "./CommissionSettings.css";

const API_BASE_URL = "https://api.maxigo.in/api";

function getAdminToken() {
  return (
    localStorage.getItem("maxigoAdminToken") ||
    localStorage.getItem("maxigo_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("maxigoToken") ||
    ""
  );
}

async function apiRequest(url, options = {}) {
  const token = getAdminToken();

  const response = await fetch(
    `${API_BASE_URL}${url}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
        ...(options.headers || {}),
      },
    }
  );

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}

function CommissionSettings() {
  const [commission, setCommission] = useState("");
  const [currentSetting, setCurrentSetting] = useState(null);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // LOAD CURRENT COMMISSION
  // =====================================================

  const loadCommission = async () => {
    try {
      setLoading(true);
      setError("");

      const current =
        await apiRequest(
          "/admin/commission/current"
        );

      setCurrentSetting(current);

      setCommission(
        current?.commissionPercent ?? ""
      );

      const historyData =
        await apiRequest(
          "/admin/commission/history"
        );

      setHistory(
        Array.isArray(historyData)
          ? historyData
          : []
      );
    } catch (err) {
      setError(
        err?.message ||
          "Failed to load commission settings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCommission();
  }, []);

  // =====================================================
  // UPDATE COMMISSION
  // =====================================================

  const handleSave = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const value = Number(commission);

    if (Number.isNaN(value)) {
      setError(
        "Please enter a valid commission percentage."
      );
      return;
    }

    if (value < 0 || value > 100) {
      setError(
        "Commission must be between 0% and 100%."
      );
      return;
    }

    try {
      setSaving(true);

      const response =
        await apiRequest(
          "/admin/commission/current",
          {
            method: "PUT",
            body: JSON.stringify({
              commissionPercent: value,
            }),
          }
        );

      setCurrentSetting(response);

      setCommission(
        response?.commissionPercent ?? value
      );

      setMessage(
        `Commission updated to ${value}% successfully.`
      );

      await loadCommission();
    } catch (err) {
      setError(
        err?.message ||
          "Failed to update commission."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // QUICK VALUE
  // =====================================================

  const selectQuickValue = (value) => {
    setCommission(value.toString());
    setMessage("");
    setError("");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="commission-page">
        <div className="commission-loading">
          Loading commission settings...
        </div>
      </section>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="commission-page">

      {/* HEADER */}
      <div className="commission-header">
        <div>
          <span className="commission-breadcrumb">
            Admin / Settings / Commission
          </span>

          <h1>
            Commission Settings
          </h1>

          <p>
            Manage the MaxiGo commission percentage
            applied to new store settlements.
          </p>
        </div>
      </div>


      {/* TOP GRID */}
      <div className="commission-grid">

        {/* CURRENT COMMISSION */}
        <div className="commission-card">

          <div className="commission-card-icon">
            %
          </div>

          <div className="commission-card-label">
            Current Commission
          </div>

          <div className="commission-current-value">
            {currentSetting?.commissionPercent ?? 0}%
          </div>

          <span className="commission-active-badge">
            ● ACTIVE
          </span>

          <p className="commission-card-note">
            This rate will be used for newly created
            store settlements.
          </p>
        </div>


        {/* CHANGE COMMISSION */}
        <div className="commission-card">

          <h2 className="commission-form-title">
            Change Commission
          </h2>

          <p className="commission-form-subtitle">
            Set the percentage for future settlements.
          </p>

          <form
            className="commission-form"
            onSubmit={handleSave}
          >

            <label>
              Commission Percentage
            </label>

            <div className="commission-input-wrap">

              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={commission}
                onChange={(e) =>
                  setCommission(
                    e.target.value
                  )
                }
                placeholder="10.00"
              />

              <span>%</span>
            </div>


            {error && (
              <div className="commission-error">
                {error}
              </div>
            )}


            {message && (
              <div className="commission-success">
                {message}
              </div>
            )}


            <button
              type="submit"
              className="commission-save-btn"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Update Commission"}
            </button>

          </form>
        </div>

      </div>


      {/* QUICK VALUES */}
      <div className="commission-card">

        <div className="commission-section-title">
          Quick Commission Values
        </div>

        <p className="commission-quick-description">
          Select a common value or enter your own percentage above.
        </p>

        <div className="commission-quick-grid">

          {[8, 10, 12, 15].map(
            (value) => (
              <button
                key={value}
                type="button"
                className={
                  Number(commission) === value
                    ? "commission-quick-btn active"
                    : "commission-quick-btn"
                }
                onClick={() =>
                  selectQuickValue(value)
                }
              >
                {value}%
              </button>
            )
          )}

        </div>
      </div>


      {/* HISTORY */}
      <div className="commission-card">

        <div className="commission-section-header">

          <div>
            <h2>
              Commission History
            </h2>

            <p>
              Previous commission settings.
            </p>
          </div>

        </div>


        {history.length === 0 ? (
          <div className="commission-empty">
            No commission history found.
          </div>
        ) : (
          <div className="commission-table-wrap">

            <table className="commission-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Commission</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>

                    <td>
                      #{item.id}
                    </td>

                    <td>
                      <strong>
                        {item.commissionPercent}%
                      </strong>
                    </td>

                    <td>
                      {item.isActive ? (
                        <span className="commission-status active">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="commission-status old">
                          OLD
                        </span>
                      )}
                    </td>

                    <td>
                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleString("en-IN")
                        : "-"}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </section>
  );
}

export default CommissionSettings;