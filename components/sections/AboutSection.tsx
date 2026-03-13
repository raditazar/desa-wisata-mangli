import { Users, Calendar, TreePine } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { icon: Users, value: "500+", label: "Pengunjung" },
  { icon: Calendar, value: "15+", label: "Program Wisata" },
  { icon: TreePine, value: "2019", label: "Berdiri Sejak" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="section-container">
        <div className="lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative rounded-[20px] lg:rounded-[28px] overflow-hidden aspect-[4/3] bg-gradient-to-br from-surface to-surface-dark">
              <div className="absolute inset-0 flex items-center justify-center text-muted">
                <TreePine size={64} />
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.2} className="mt-10 lg:mt-0">
            <SectionHeading
              title="Tentang Desa Mangli"
              subtitle="Mengenal lebih dekat kehidupan desa yang penuh pesona"
              centered={false}
            />

            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Desa Mangli terletak di lereng perbukitan Kabupaten Magelang, Jawa
                Tengah. Dikelilingi oleh hamparan sawah terasering dan kebun yang
                hijau, desa ini menawarkan ketenangan dan keindahan alam yang sulit
                ditemukan di kota.
              </p>
              <p>
                Sejak 2019, warga desa berkomitmen untuk melestarikan budaya lokal
                sambil membuka pintu bagi wisatawan yang ingin merasakan kehidupan
                desa yang sesungguhnya. Dari menginap di rumah warga hingga belajar
                berkebun bersama petani, setiap pengalaman dirancang agar Anda
                merasa menjadi bagian dari komunitas.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-surface rounded-2xl"
                >
                  <stat.icon
                    size={24}
                    className="mx-auto mb-2 text-accent"
                  />
                  <div className="font-serif text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
