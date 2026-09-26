import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLanguage,
} from "./LanguageContext";

import {
  getStoreBankAccount,
  addStoreBankAccount,
  updateStoreBankAccount,
  deleteStoreBankAccount,
} from "./api";

import "./Earnings.css";

function Earnings({
  dashboard,
  settlements = [],
  orders = [],
}) {
  const { t } = useLanguage();

  // =====================================================
  // PERIOD
  // =====================================================

  const [period, setPeriod] =
    useState("all");

  // =====================================================
  // BANK ACCOUNT
  // =====================================================

  const [bankAccount, setBankAccount] =
    useState(null);

  const [bankLoading, setBankLoading] =
    useState(true);

  const [showBankModal, setShowBankModal] =
    useState(false);

  const [savingBank, setSavingBank] =
    useState(false);

  const [deletingBank, setDeletingBank] =
    useState(false);

  const [bankError, setBankError] =
    useState("");

  const [bankSuccess, setBankSuccess] =
    useState("");

  const [bankForm, setBankForm] =
    useState({
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      branchName: "",
      accountType: "SAVINGS",
      upiId: "",
    });

  // =====================================================
  // DELIVERED ORDERS
  // =====================================================

  const deliveredOrders =
    useMemo(
      () =>
        orders.filter(
          (order) =>
            String(
              order.orderStatus || ""
            ).toUpperCase() ===
            "DELIVERED"
        ),
      [orders]
    );

  // =====================================================
  // TOTAL SALES
  // =====================================================

  const totalSales =
    Number(
      dashboard?.totalSales || 0
    );

  // =====================================================
  // SETTLEMENT TOTALS
  // =====================================================

  const settlementTotals =
    useMemo(() => {
      return settlements.reduce(
        (acc, item) => {

          const status =
            String(
              item.settlementStatus ||
                ""
            ).toUpperCase();

          const gross =
            Number(
              item.grossOrderValue || 0
            );

          const commission =
            Number(
              item.maxigoCommission || 0
            );

          const net =
            Number(
              item.netSettlement || 0
            );

          const paid =
            status === "PAID" ||
            status === "SETTLED"
              ? net
              : 0;

          return {
            gross:
              acc.gross + gross,

            commission:
              acc.commission +
              commission,

            net:
              acc.net + net,

            paid:
              acc.paid + paid,
          };
        },
        {
          gross: 0,
          commission: 0,
          net: 0,
          paid: 0,
        }
      );
    }, [settlements]);

  // =====================================================
  // AVAILABLE PAYOUT
  // =====================================================

  const availablePayout =
    Math.max(
      0,
      settlementTotals.net -
        settlementTotals.paid
    );

  // =====================================================
  // CARD AMOUNT
  // =====================================================

  const amountForCard =
    period === "all"
      ? totalSales
      : deliveredOrders.reduce(
          (sum, order) =>
            sum +
            Number(
              order.totalAmount || 0
            ),
          0
        );

  // =====================================================
  // LOAD BANK ACCOUNT
  // =====================================================

  const loadBankAccount =
    async () => {

      setBankLoading(true);
      setBankError("");

      try {

        const data =
          await getStoreBankAccount();

        setBankAccount(data);

      } catch (error) {

        setBankError(
          error?.message ||
            "Unable to load bank account."
        );

      } finally {

        setBankLoading(false);
      }
    };

  useEffect(() => {

    loadBankAccount();

  }, []);

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddBankModal =
    () => {

      setBankError("");
      setBankSuccess("");

      setBankForm({
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        branchName: "",
        accountType: "SAVINGS",
        upiId: "",
      });

      setShowBankModal(true);
    };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditBankModal =
    () => {

      setBankError("");
      setBankSuccess("");

      setBankForm({
        accountHolderName:
          bankAccount?.accountHolderName ||
          "",

        bankName:
          bankAccount?.bankName ||
          "",

        // IMPORTANT:
        // Full account number is not returned
        // by backend.
        // Blank means keep existing number.

        accountNumber: "",

        ifscCode:
          bankAccount?.ifscCode ||
          "",

        branchName:
          bankAccount?.branchName ||
          "",

        accountType:
          bankAccount?.accountType ||
          "SAVINGS",

        upiId:
          bankAccount?.upiId ||
          "",
      });

      setShowBankModal(true);
    };

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleBankChange =
    (field, value) => {

      setBankForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  // =====================================================
  // SAVE BANK ACCOUNT
  // =====================================================

  const handleSaveBank =
    async (event) => {

      event.preventDefault();

      setBankError("");
      setBankSuccess("");

      if (
        !bankForm.accountHolderName.trim()
      ) {

        setBankError(
          "Please enter account holder name."
        );

        return;
      }

      if (
        !bankForm.bankName.trim()
      ) {

        setBankError(
          "Please enter bank name."
        );

        return;
      }

      if (
        !bankAccount?.exists &&
        !bankForm.accountNumber.trim()
      ) {

        setBankError(
          "Please enter account number."
        );

        return;
      }

      if (
        bankForm.accountNumber.trim() &&
        !/^\d{9,18}$/.test(
          bankForm.accountNumber.trim()
        )
      ) {

        setBankError(
          "Account number must contain 9 to 18 digits."
        );

        return;
      }

      if (
        !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(
          bankForm.ifscCode.trim()
        )
      ) {

        setBankError(
          "Please enter a valid IFSC code."
        );

        return;
      }

      if (
        !bankForm.branchName.trim()
      ) {

        setBankError(
          "Please enter branch name."
        );

        return;
      }

      if (
        bankForm.upiId.trim() &&
        !/^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+$/.test(
          bankForm.upiId.trim()
        )
      ) {

        setBankError(
          "Please enter a valid UPI ID."
        );

        return;
      }

      try {

        setSavingBank(true);

        const payload = {
          accountHolderName:
            bankForm.accountHolderName.trim(),

          bankName:
            bankForm.bankName.trim(),

          accountNumber:
            bankForm.accountNumber.trim(),

          ifscCode:
            bankForm.ifscCode
              .trim()
              .toUpperCase(),

          branchName:
            bankForm.branchName.trim(),

          accountType:
            bankForm.accountType,

          upiId:
            bankForm.upiId.trim(),
        };

        let saved;

        if (
          bankAccount?.exists
        ) {

          saved =
            await updateStoreBankAccount(
              payload
            );

        } else {

          saved =
            await addStoreBankAccount(
              payload
            );
        }

        setBankAccount(saved);

        setBankSuccess(
          "Bank details saved successfully."
        );

        setShowBankModal(false);

      } catch (error) {

        setBankError(
          error?.message ||
            "Unable to save bank details."
        );

      } finally {

        setSavingBank(false);
      }
    };

  // =====================================================
  // DELETE BANK ACCOUNT
  // =====================================================

  const handleDeleteBank =
    async () => {

      const confirmed =
        window.confirm(
          "Are you sure you want to remove your bank account?"
        );

      if (!confirmed) {
        return;
      }

      setBankError("");
      setBankSuccess("");

      try {

        setDeletingBank(true);

        await deleteStoreBankAccount();

        setBankAccount({
          exists: false,
        });

        setBankSuccess(
          "Bank account removed successfully."
        );

      } catch (error) {

        setBankError(
          error?.message ||
            "Unable to remove bank account."
        );

      } finally {

        setDeletingBank(false);
      }
    };

  // =====================================================
  // BANK STATUS
  // =====================================================

  const bankStatus =
    String(
      bankAccount?.verificationStatus ||
        "PENDING"
    ).toUpperCase();

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="earnings-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="earnings-header">

        <div>

          <h1>
            {t("earnings") ||
              "Earnings"}
          </h1>

          <p>
            {t(
              "earningsDescription"
            ) ||
              "Track your earnings, commission and settlements."}
          </p>

        </div>

        <div className="earnings-period-toggle">

          <button
            type="button"
            className={
              period === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setPeriod("all")
            }
          >
            All
          </button>

          <button
            type="button"
            className={
              period === "delivered"
                ? "active"
                : ""
            }
            onClick={() =>
              setPeriod("delivered")
            }
          >
            Delivered Orders
          </button>

        </div>

      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="earnings-summary-grid">

        <div className="earnings-summary-card">

          <span>💰</span>

          <div>

            <small>
              Total Sales
            </small>

            <strong>
              ₹
              {amountForCard.toLocaleString(
                "en-IN"
              )}
            </strong>

            <p>
              Backend dashboard
            </p>

          </div>

        </div>

        <div className="earnings-summary-card">

          <span>🧾</span>

          <div>

            <small>
              Completed Orders
            </small>

            <strong>
              {dashboard?.deliveredOrders ??
                deliveredOrders.length}
            </strong>

            <p>
              Delivered successfully
            </p>

          </div>

        </div>

        <div className="earnings-summary-card">

          <span>📉</span>

          <div>

            <small>
              MaxiGo Commission
            </small>

            <strong>
              ₹
              {settlementTotals.commission.toLocaleString(
                "en-IN"
              )}
            </strong>

            <p>
              Settlement records
            </p>

          </div>

        </div>

        <div className="earnings-summary-card">

          <span>🏦</span>

          <div>

            <small>
              Net Settlement
            </small>

            <strong>
              ₹
              {settlementTotals.net.toLocaleString(
                "en-IN"
              )}
            </strong>

            <p>
              Settlement records
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          PAYOUT SECTION
      ================================================= */}

      <div className="payout-section">

        {/* ===============================================
            AVAILABLE PAYOUT
        =============================================== */}

        <div className="payout-balance-card">

          <div className="payout-card-icon">
            💰
          </div>

          <div className="payout-balance-content">

            <span>
              Available for Payout
            </span>

            <strong>
              ₹
              {availablePayout.toLocaleString(
                "en-IN"
              )}
            </strong>

            <small>
              Based on current settlement
              records.
            </small>

          </div>

        </div>

        {/* ===============================================
            BANK ACCOUNT
        =============================================== */}

        <div className="payout-bank-card">

          <div className="payout-bank-header">

            <div>

              <h2>
                Bank Account
              </h2>

              <p>
                Add your bank details
                to receive MaxiGo
                payouts.
              </p>

            </div>

            <span
              className={
                bankAccount?.exists
                  ? "bank-status-added"
                  : "bank-status-not-added"
              }
            >
              {bankAccount?.exists
                ? bankStatus
                : "NOT ADDED"}
            </span>

          </div>

          {bankLoading ? (

            <div className="bank-details-loading">
              Loading bank account...
            </div>

          ) : bankAccount?.exists ? (

            <>

              <div className="bank-details-grid">

                <div className="bank-detail-item">
                  <span>
                    Account Holder
                  </span>

                  <strong>
                    {
                      bankAccount.accountHolderName ||
                      "-"
                    }
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>
                    Bank Name
                  </span>

                  <strong>
                    {
                      bankAccount.bankName ||
                      "-"
                    }
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>
                    Account Number
                  </span>

                  <strong>
                    {
                      bankAccount.accountNumberMasked ||
                      "XXXX XXXX"
                    }
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>
                    IFSC Code
                  </span>

                  <strong>
                    {
                      bankAccount.ifscCode ||
                      "-"
                    }
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>
                    Branch
                  </span>

                  <strong>
                    {
                      bankAccount.branchName ||
                      "-"
                    }
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>
                    Account Type
                  </span>

                  <strong>
                    {
                      bankAccount.accountType ||
                      "SAVINGS"
                    }
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>
                    UPI ID
                  </span>

                  <strong>
                    {
                      bankAccount.upiId ||
                      "Not added"
                    }
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>
                    Verification
                  </span>

                  <strong
                    className={
                      bankStatus === "VERIFIED"
                        ? "bank-verification-success"
                        : "bank-verification-pending"
                    }
                  >
                    {bankStatus}
                  </strong>
                </div>

              </div>

              <div className="bank-account-actions">

                <button
                  type="button"
                  className="bank-edit-button"
                  onClick={
                    openEditBankModal
                  }
                >
                  ✏ Edit Bank Details
                </button>

                <button
                  type="button"
                  className="bank-delete-button"
                  onClick={
                    handleDeleteBank
                  }
                  disabled={deletingBank}
                >
                  {deletingBank
                    ? "Removing..."
                    : "🗑 Remove"}
                </button>

              </div>

            </>

          ) : (

            <div className="bank-not-added-new">

              <div className="bank-not-added-icon">
                🏦
              </div>

              <div className="bank-not-added-content">

                <h3>
                  Bank account not added
                </h3>

                <p>
                  Add your bank account
                  details to receive
                  MaxiGo settlements
                  and payouts.
                </p>

                <button
                  type="button"
                  className="add-bank-button"
                  onClick={
                    openAddBankModal
                  }
                >
                  + Add Bank Details
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* =================================================
          SUCCESS / ERROR MESSAGE
      ================================================= */}

      {bankSuccess && (

        <div className="bank-success-message">
          ✓ {bankSuccess}
        </div>

      )}

      {bankError && !showBankModal && (

        <div className="bank-error-message">
          {bankError}
        </div>

      )}

      {/* =================================================
          SETTLEMENT + SUMMARY
      ================================================= */}

      <div className="earnings-grid">

        {/* ===============================================
            SETTLEMENT HISTORY
        =============================================== */}

        <div className="earnings-panel">

          <div className="earnings-panel-head">

            <div>

              <h2>
                Settlement History
              </h2>

              <p>
                Store settlement
                records from the
                backend.
              </p>

            </div>

          </div>

          {settlements.length === 0 ? (

            <div className="earnings-empty">

              <div>
                💳
              </div>

              <h3>
                No settlements yet
              </h3>

              <p>
                Settlement records
                will appear here
                once created by
                the backend.
              </p>

            </div>

          ) : (

            <div className="earnings-table-wrap">

              <table className="earnings-table">

                <thead>

                  <tr>

                    <th>
                      Order
                    </th>

                    <th>
                      Gross
                    </th>

                    <th>
                      Commission
                    </th>

                    <th>
                      Net
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {settlements.map(
                    (item) => (

                      <tr
                        key={
                          item.id
                        }
                      >

                        <td>
                          #
                          {item.orderId ??
                            "-"}
                        </td>

                        <td>
                          ₹
                          {Number(
                            item.grossOrderValue ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td>
                          ₹
                          {Number(
                            item.maxigoCommission ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td>

                          <strong>
                            ₹
                            {Number(
                              item.netSettlement ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                        </td>

                        <td>

                          <span className="history-status">
                            {
                              item.settlementStatus ||
                              "-"
                            }
                          </span>

                        </td>

                        <td>
                          {item.settlementDate
                            ? new Date(
                                item.settlementDate
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* ===============================================
            SUMMARY
        =============================================== */}

        <div className="earnings-panel">

          <div className="earnings-panel-head">

            <div>

              <h2>
                Summary
              </h2>

              <p>
                Values currently
                available from
                APIs.
              </p>

            </div>

          </div>

          <div className="earnings-breakdown">

            <div>

              <span>
                Gross settlement
                value
              </span>

              <strong>
                ₹
                {settlementTotals.gross.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div>

              <span>
                MaxiGo commission
              </span>

              <strong>
                ₹
                {settlementTotals.commission.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div>

              <span>
                Paid / settled
              </span>

              <strong>
                ₹
                {settlementTotals.paid.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div>

              <span>
                Net settlement
              </span>

              <strong>
                ₹
                {settlementTotals.net.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          ADD / EDIT BANK MODAL
      ================================================= */}

      {showBankModal && (

        <div
          className="bank-modal-overlay"
          onClick={() =>
            !savingBank &&
            setShowBankModal(false)
          }
        >

          <div
            className="bank-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="bank-modal-header">

              <div>

                <span>
                  🏦
                </span>

                <div>

                  <h2>
                    {
                      bankAccount?.exists
                        ? "Edit Bank Details"
                        : "Add Bank Details"
                    }
                  </h2>

                  <p>
                    Use the bank account
                    where your MaxiGo
                    earnings should be
                    settled.
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="bank-modal-close"
                onClick={() =>
                  !savingBank &&
                  setShowBankModal(false)
                }
              >
                ✕
              </button>

            </div>

            <form
              className="bank-form"
              onSubmit={
                handleSaveBank
              }
            >

              {/* ACCOUNT HOLDER */}

              <div className="bank-form-group">

                <label>
                  Account Holder Name
                </label>

                <input
                  type="text"
                  value={
                    bankForm.accountHolderName
                  }
                  onChange={(event) =>
                    handleBankChange(
                      "accountHolderName",
                      event.target.value
                    )
                  }
                  placeholder="Enter account holder name"
                  required
                />

              </div>

              {/* BANK */}

              <div className="bank-form-group">

                <label>
                  Bank Name
                </label>

                <input
                  type="text"
                  value={
                    bankForm.bankName
                  }
                  onChange={(event) =>
                    handleBankChange(
                      "bankName",
                      event.target.value
                    )
                  }
                  placeholder="e.g. State Bank of India"
                  required
                />

              </div>

              {/* ACCOUNT NUMBER */}

              <div className="bank-form-group">

                <label>
                  Account Number
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={18}
                  value={
                    bankForm.accountNumber
                  }
                  onChange={(event) =>
                    handleBankChange(
                      "accountNumber",
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder={
                    bankAccount?.exists
                      ? "Leave blank to keep existing account"
                      : "Enter bank account number"
                  }
                  required={
                    !bankAccount?.exists
                  }
                />

                {bankAccount?.exists && (
                  <small>
                    Existing account:
                    {" "}
                    {
                      bankAccount.accountNumberMasked
                    }
                    .
                    Leave this field
                    blank to keep it.
                  </small>
                )}

              </div>

              {/* IFSC */}

              <div className="bank-form-group">

                <label>
                  IFSC Code
                </label>

                <input
                  type="text"
                  maxLength={11}
                  value={
                    bankForm.ifscCode
                  }
                  onChange={(event) =>
                    handleBankChange(
                      "ifscCode",
                      event.target.value
                        .toUpperCase()
                    )
                  }
                  placeholder="e.g. SBIN0001234"
                  required
                />

              </div>

              {/* BRANCH */}

              <div className="bank-form-group">

                <label>
                  Branch Name
                </label>

                <input
                  type="text"
                  value={
                    bankForm.branchName
                  }
                  onChange={(event) =>
                    handleBankChange(
                      "branchName",
                      event.target.value
                    )
                  }
                  placeholder="Enter branch name"
                  required
                />

              </div>

              {/* ACCOUNT TYPE */}

              <div className="bank-form-group">

                <label>
                  Account Type
                </label>

                <select
                  value={
                    bankForm.accountType
                  }
                  onChange={(event) =>
                    handleBankChange(
                      "accountType",
                      event.target.value
                    )
                  }
                >

                  <option value="SAVINGS">
                    Savings Account
                  </option>

                  <option value="CURRENT">
                    Current Account
                  </option>

                </select>

              </div>

              {/* UPI */}

              <div className="bank-form-group">

                <label>
                  UPI ID
                  <span>
                    {" "}
                    (Optional)
                  </span>
                </label>

                <input
                  type="text"
                  value={
                    bankForm.upiId
                  }
                  onChange={(event) =>
                    handleBankChange(
                      "upiId",
                      event.target.value
                    )
                  }
                  placeholder="example@upi"
                />

              </div>

              {bankError && (

                <div className="bank-modal-error">
                  {bankError}
                </div>

              )}

              <div className="bank-security-note">

                🔒 Your full account
                number is not displayed
                in the Store Panel after
                saving.

              </div>

              <div className="bank-form-actions">

                <button
                  type="button"
                  className="bank-cancel-button"
                  onClick={() =>
                    !savingBank &&
                    setShowBankModal(false)
                  }
                  disabled={savingBank}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bank-save-button"
                  disabled={savingBank}
                >
                  {savingBank
                    ? "Saving..."
                    : bankAccount?.exists
                    ? "Update Bank Details"
                    : "Save Bank Details"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Earnings;