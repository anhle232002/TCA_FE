import { useUserProfile } from "@/api/getUserProfile";
import { useUpdateProfile } from "@/api/updateProfile";
import { LANGUAGES } from "@/utils/languages";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EditAvatar } from "./edit-avatar";

interface Props {
    onClose: () => void;
}
interface IFormData {
    fullName: string;
    city: string;
    phone: string;
    describe: string;
    language: string;
}

export const EditProfileModal: React.FC<Props> = ({ onClose }) => {
    const { data: profileData } = useUserProfile();
    const updateProfileMutation = useUpdateProfile();
    const [selectedTab, setSelectedTab] = useState<"profile" | "avatar">("profile");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>({
        mode: "onBlur",
        values: profileData,
    });

    const onSubmit = async (data: IFormData) => {
        await updateProfileMutation.mutateAsync(data);
    };

    return (
        <div className="fixed inset-0 center z-50">
            <div className="backdrop bg-black/50 absolute inset-0"></div>

            <div className="relative bg-secondary dark:bg-dark__secondary w-[30rem] rounded-md overflow-hidden min-h-[600px]">
                <div className="flex items-center justify-between px-8 py-4 bg-secondary-content dark:bg-dark__secondary-content ">
                    <div className="flex gap-6">
                        <h4
                            role="button"
                            onClick={() => setSelectedTab("profile")}
                            className={`bg-secondary shadow dark:bg-dark__secondary px-4 py-1 rounded hover:bg-opacity-70 ${
                                selectedTab === "profile" ? "opacity-100" : "opacity-60"
                            }`}
                        >
                            Profile Edit
                        </h4>

                        <h4
                            role="button"
                            onClick={() => setSelectedTab("avatar")}
                            className={`bg-secondary shadow dark:bg-dark__secondary px-4 py-1 rounded hover:bg-opacity-70 ${
                                selectedTab === "avatar" ? "opacity-100" : "opacity-60"
                            }`}
                        >
                            Avatar
                        </h4>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-6 h-6 bg-secondary dark:bg-dark__secondary rounded-full"
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                {selectedTab === "profile" && (
                    <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-2 pb-4 mt-4">
                        <div className="space-y-2">
                            <label className="text-sm">
                                Fullname
                                <span className=" ml-4 text-xs text-red-500 ">
                                    {errors.fullName && "Invalid name"}
                                </span>
                            </label>
                            <div className="relative flex border-2 dark:border-none rounded overflow-hidden mb-4 items-center h-10 focus-within:ring-2 ring-primary/50 ">
                                <div className="bg-secondary-content dark:bg-dark__secondary-content  h-full w-10 center">
                                    <i className="ri-user-line"></i>
                                </div>
                                <input
                                    {...register("fullName", { pattern: /^[a-zA-Z ]{2,30}$/ })}
                                    className="outline-none capitalize px-2 h-full py-2 text-sm flex-1  dark:text-dark__secondary-content"
                                    type="text"
                                    placeholder="username"
                                />
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <label className="text-sm">Language</label>

                            <div className="flex rounded border-2 dark:border-none  overflow-hidden mb-4 items-center h-10 focus-within:ring-2 ring-primary/50">
                                <div className="bg-secondary-content dark:bg-dark__secondary-content h-full w-10 center">
                                    <i className="ri-building-4-line"></i>
                                </div>
                                <select
                                    {...register("language")}
                                    className="w-full h-full text-accent px-2 text-sm outline-none"
                                    name="language"
                                    id=""
                                >
                                    {Object.keys(LANGUAGES).map((key) => {
                                        return (
                                            <option key={key} value={key}>
                                                {LANGUAGES[key]}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2 mt-6">
                            <label className="text-sm">City</label>
                            <div className="flex rounded border-2 dark:border-none overflow-hidden mb-4 items-center h-10 focus-within:ring-2 ring-primary/50">
                                <div className="bg-secondary-content dark:bg-dark__secondary-content h-full w-10 center">
                                    <i className="ri-building-4-line"></i>
                                </div>
                                <input
                                    {...register("city")}
                                    className="outline-none capitalize px-2 h-full py-2 text-sm flex-1 dark:text-dark__secondary-content"
                                    type="text"
                                    placeholder="Ex: Da Nang"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 mt-6">
                            <label className="text-sm">
                                Phone
                                <span className=" ml-4 text-xs text-red-500 ">
                                    {errors.phone && "Invalid phone number"}
                                </span>
                            </label>
                            <div className="flex border-2 dark:border-none rounded overflow-hidden mb-4 items-center h-10 focus-within:ring-2 ring-primary/50">
                                <div className="bg-secondary-content dark:bg-dark__secondary-content h-full w-10 center">
                                    <i className="ri-phone-line"></i>
                                </div>
                                <input
                                    {...register("phone", {
                                        pattern:
                                            /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
                                    })}
                                    className="outline-none px-2 h-full py-2 text-sm flex-1 dark:text-dark__secondary-content"
                                    type="text"
                                    placeholder="(555) 555 555 555"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="text-sm">Write a few words that describe you</label>
                            <textarea
                                rows={5}
                                {...register("describe")}
                                className="w-full mt-1 duration-200 dark:text-dark__secondary-content px-2 py-2 text-sm border rounded outline-none focus:ring-2 ring-primary/50 "
                            ></textarea>
                        </div>

                        <div className="mt-6 text-end">
                            <button
                                type="submit"
                                className="bg-primary text-secondary w-20 py-1 text-sm rounded shadow hover:bg-primary-focus duration-100"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}

                {selectedTab === "avatar" && <EditAvatar />}
            </div>
        </div>
    );
};
