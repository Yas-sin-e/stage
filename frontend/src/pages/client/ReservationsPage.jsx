import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../services/api/axios";

const ReservationsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      vehicleId: location.state?.vehicleId || "",
      serviceId: "",
      customProblem: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [vehiclesRes, servicesRes] = await Promise.all([
        api.get("/vehicles"),
        api.get("/services"),
      ]);
      setVehicles(vehiclesRes.data);
      setServices(servicesRes.data.filter((s) => s.isActive));
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const reservationData = {
        vehicleId: data.vehicleId,
        serviceId: data.serviceId === "custom" ? null : data.serviceId || null,
        customProblem: data.serviceId === "custom" ? data.customProblem : "",
        date: data.date,
        time: data.time,
        notes: data.notes,
      };

      await api.post("/reservations", reservationData);
      alert("📅 Réservation créée avec succès !");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de la création");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 italic uppercase">
            Réserver un <span className="text-purple-500">Service</span>
          </h1>
          <p className="text-slate-400">
            Choisissez le créneau qui vous convient le mieux
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 relative"
          >
            {/* Sélection véhicule */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                Sélectionner un véhicule
              </label>
              <select
                {...register("vehicleId", {
                  required: "Veuillez choisir un véhicule",
                })}
                className={`w-full px-6 py-4 bg-black border ${errors.vehicleId ? "border-red-500" : "border-slate-800"} rounded-2xl text-white focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer`}
              >
                <option value="">-- Choisissez votre voiture --</option>
                {vehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    🚗 {v.brand} {v.model} ({v.plate})
                  </option>
                ))}
              </select>
              {errors.vehicleId && (
                <p className="text-red-500 text-xs ml-2">
                  {errors.vehicleId.message}
                </p>
              )}
            </div>

            {/* Sélection service */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                Type de prestation
              </label>
              <select
                {...register("serviceId")}
                className={`w-full px-6 py-4 bg-black border ${errors.serviceId ? "border-red-500" : "border-slate-800"} rounded-2xl text-white focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer`}
              >
                <option value="">-- Choisissez un service --</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    🛠️ {s.name}
                  </option>
                ))}
                <option value="custom">✏️ Autre problème (non listé)</option>
              </select>
            </div>

            {/* Champ pour problème personnalisé */}
            {watch("serviceId") === "custom" && (
              <div className="space-y-2 animate-fade-in">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                  Décrivez votre problème
                </label>
                <textarea
                  {...register("customProblem", {
                    required: "Décrivez votre problème",
                  })}
                  rows="4"
                  className="w-full px-6 py-4 bg-black border border-slate-800 rounded-2xl text-white focus:border-purple-500 outline-none transition-all resize-none"
                  placeholder="Décrivez le problème de votre véhicule en détail..."
                />
                {errors.customProblem && (
                  <p className="text-red-500 text-xs ml-2">
                    {errors.customProblem.message}
                  </p>
                )}
              </div>
            )}

            {/* Date et Heure */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                  Date du rendez-vous
                </label>
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setValue(
                        "date",
                        date ? date.toISOString().split("T")[0] : "",
                      );
                    }}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Sélectionnez une date"
                    className="w-full px-6 py-4 bg-black border border-slate-800 rounded-2xl text-white focus:border-purple-500 outline-none transition-all placeholder-slate-400"
                    calendarClassName="bg-slate-800 border-slate-700 text-white"
                    dayClassName={(date) =>
                      date.getTime() >= new Date().setHours(0, 0, 0, 0)
                        ? "text-white hover:bg-purple-600"
                        : "text-slate-500"
                    }
                    wrapperClassName="w-full"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <input
                  type="hidden"
                  {...register("date", { required: "Date obligatoire" })}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs ml-2">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                  Heure
                </label>
                <div className="relative">
                  <input
                    type="time"
                    {...register("time", { required: "Heure obligatoire" })}
                    className="w-full px-6 py-4 bg-black border border-slate-800 rounded-2xl text-white focus:border-purple-500 outline-none transition-all placeholder-slate-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                Notes supplémentaires (optionnel)
              </label>
              <textarea
                rows="3"
                {...register("notes")}
                className="w-full px-6 py-4 bg-black border border-slate-800 rounded-2xl text-white focus:border-purple-500 outline-none transition-all resize-none"
                placeholder="Ex: Problème de freinage, bruit suspect..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col md:flex-row gap-4 pt-6">
              <button
                type="submit"
                className="flex-[2] py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-500/20 uppercase tracking-widest"
              >
                Confirmer le RDV
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 py-5 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all uppercase text-sm"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;
