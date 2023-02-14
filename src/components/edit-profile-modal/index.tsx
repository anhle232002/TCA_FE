import React from "react";

interface Props {
    onClose: () => void;
}

export const EditProfileModal: React.FC<Props> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 center">
            <div onClick={onClose} className="backdrop bg-black/50 absolute inset-0"></div>

            <div className="relative bg-secondary w-[30rem] rounded-md overflow-hidden">
                <div className="flex justify-between px-8 py-4 bg-secondary-content ">
                    <div>
                        <h3>Profile Edit</h3>
                    </div>

                    <button onClick={onClose} className="w-6 h-6 bg-secondary rounded-full">
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <form action="" className="px-8 py-2 mt-4 ">
                    <div className="space-y-2">
                        <label className="text-sm">Fullname</label>
                        <div className="flex border rounded  mb-4 items-center h-10 focus-within:ring-2 ring-primary/50">
                            <div className="bg-secondary-content h-full w-10 center">
                                <i className="ri-user-line"></i>
                            </div>
                            <input
                                className="outline-none px-2 h-full py-2 text-sm flex-1"
                                type="text"
                                placeholder="username"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 mt-6">
                        <label className="text-sm">City</label>
                        <div className="flex border rounded  mb-4 items-center h-10 focus-within:ring-2 ring-primary/50">
                            <div className="bg-secondary-content h-full w-10 center">
                                <i className="ri-building-4-line"></i>
                            </div>
                            <input
                                className="outline-none px-2 h-full py-2 text-sm flex-1"
                                type="text"
                                placeholder="Ex: Da Nang"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 mt-6">
                        <label className="text-sm">Phone</label>
                        <div className="flex border rounded  mb-4 items-center h-10 focus-within:ring-2 ring-primary/50">
                            <div className="bg-secondary-content h-full w-10 center">
                                <i className="ri-phone-line"></i>
                            </div>
                            <input
                                className="outline-none px-2 h-full py-2 text-sm flex-1"
                                type="text"
                                placeholder="(555) 555 555 555"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="text-sm">Write a few words that describe you</label>
                        <textarea
                            rows={5}
                            className="w-full mt-1 duration-200 px-2 py-2 text-sm border rounded outline-none focus:ring-2 ring-primary/50 "
                        ></textarea>
                    </div>

                    <div className="mt-6 text-end">
                        <button className="bg-primary text-secondary w-16 py-1 text-sm rounded shadow hover:bg-primary-focus duration-100">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
