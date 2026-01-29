import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  Plus,
  UploadSimple,
  Code,
  PaintBrush,
  Cloud,
  BugBeetle,
  UsersThree,
  Briefcase,
} from "@phosphor-icons/react";

export default function CreateCourseModal({ open, onClose, onSubmit }) {
  const SKILLS = useMemo(
    () => [
      { key: "csharp", label: "C#", icon: Code },
      { key: "design", label: "Design", icon: PaintBrush },
      { key: "js", label: "JavaScript", icon: Code },
      { key: "qa", label: "Automation Testing", icon: BugBeetle },
      { key: "cloud", label: "Cloud", icon: Cloud },
    ],
    []
  );

  const DEPARTMENTS = useMemo(
    () => [
      { key: "qa", label: "Quality Assurance", icon: BugBeetle },
      { key: "support", label: "Support", icon: UsersThree },
      { key: "webdev", label: "Web Dev", icon: Code },
    ],
    []
  );

  const [moduleTitle, setModuleTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricing, setPricing] = useState("");
  const [durationHours, setDurationHours] = useState("");
  const [link, setLink] = useState("");
  const [coverFile, setCoverFile] = useState(null);

  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const resetForm = () => {
    setModuleTitle("");
    setDescription("");
    setPricing("");
    setDurationHours("");
    setLink("");
    setCoverFile(null);
    setSelectedSkill("");
    setSelectedDepartment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      moduleTitle,
      description,
      pricing: Number(pricing),
      durationHours: Number(durationHours),
      link,
      coverFile,
      skill: selectedSkill || null,
      department: selectedDepartment || null,
    };

    onSubmit?.(payload);
    resetForm();
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-[min(860px,90vw)] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#F3F3F3] shadow-2xl border border-black/10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/10">
          <div className="flex items-center gap-2">
            <Briefcase size={20} weight="bold" />
            <h2 className="font-semibold text-slate-900">Create Course</h2>
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full grid place-items-center hover:bg-black/5"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-12 gap-4">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-8 space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Module Title <span className="text-red-500">*</span>
                </label>
                <input
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  className="mt-2 w-full h-11 px-4 rounded-lg border border-black/10"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 w-full min-h-[110px] p-4 rounded-lg border border-black/10 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Pricing <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value)}
                    type="number"
                    className="mt-2 w-full h-11 px-4 rounded-lg border border-black/10"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Duration (hrs) <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={durationHours}
                    onChange={(e) => setDurationHours(e.target.value)}
                    type="number"
                    className="mt-2 w-full h-11 px-4 rounded-lg border border-black/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Link <span className="text-red-500">*</span>
                </label>
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="mt-2 w-full h-11 px-4 rounded-lg border border-black/10"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Cover Image <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <label className="px-4 py-2 border rounded-lg cursor-pointer bg-white flex items-center gap-2">
                    <UploadSimple size={18} />
                    Choose file
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                      required
                    />
                  </label>
                  <span className="text-sm text-gray-500 truncate max-w-[200px]">
                    {coverFile ? coverFile.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              {/* Skills */}
              <div className="bg-white border border-black/10 rounded-xl p-4">
                <div className="font-semibold mb-2">Skills</div>

                <div className="space-y-2">
                  {SKILLS.map((s) => {
                    const Icon = s.icon;
                    const active = selectedSkill === s.key;

                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setSelectedSkill(s.key)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border ${
                          active
                            ? "bg-[#FFF8D8] border-[#DAB619]"
                            : "border-black/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon size={16} />
                          {s.label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="mt-3 w-full flex items-center px-3 py-2 rounded-lg border border-black/10 hover:bg-black/5 text-left"
                >
                  <span>Add more skills</span>
                  <Plus size={16} className="ml-auto" />
                </button>
              </div>

              {/* Department */}
              <div className="bg-white border border-black/10 rounded-xl p-4">
                <div className="font-semibold mb-2">Department</div>

                <div className="space-y-2">
                  {DEPARTMENTS.map((d) => {
                    const Icon = d.icon;
                    const active = selectedDepartment === d.key;

                    return (
                      <button
                        key={d.key}
                        type="button"
                        onClick={() => setSelectedDepartment(d.key)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border ${
                          active
                            ? "bg-[#FFF8D8] border-[#DAB619]"
                            : "border-black/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon size={16} />
                          {d.label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="mt-3 w-full flex items-center px-3 py-2 rounded-lg border border-black/10 hover:bg-black/5 text-left"
                >
                  <span>Add more departments</span>
                  <Plus size={16} className="ml-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose?.();
              }}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#DAB619] text-white rounded-lg"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
