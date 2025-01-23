import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Container, GroupVariants, PizzaImage, Title } from '@/shared/components/shared';

export const dynamicParams = true;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { ingredients: true, items: true },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} size={30} />

        <div className="w-[490px] bg-[#fbfafa] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, accusantium.
          </p>
          <GroupVariants
            value="2"
            items={[
              { name: 'Маленькая', value: '1' },
              { name: 'Средняя ', value: '2' },
              { name: 'Большая', value: '3' },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
