import { PrismaClient, Role, Section } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'dev.db')
const adapter = new PrismaBetterSqlite3({
    url: dbPath
})
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting database seed...');

    // 1. Create Super Admin (Developer)
    const superAdminPassword = await bcrypt.hash('superadmin123', 10);

    const superAdmin = await prisma.user.upsert({
        where: { email: 'dev@agrupamento1066.pt' },
        update: {},
        create: {
            name: 'Super Admin (Developer)',
            email: 'dev@agrupamento1066.pt',
            password: superAdminPassword,
            role: Role.SUPER_ADMIN,
            scoutNumber: '00000001',
            status: 'APPROVED',
        },
    });

    console.log('✅ Super Admin created:', superAdmin.email);

    // 2. Create Group Leader (Chefe de Agrupamento)
    const groupLeaderPassword = await bcrypt.hash('admin123', 10);

    const groupLeader = await prisma.user.upsert({
        where: { email: 'admin@agrupamento1066.pt' },
        update: {},
        create: {
            name: 'Chefe de Agrupamento',
            email: 'admin@agrupamento1066.pt',
            password: groupLeaderPassword,
            role: Role.GROUP_LEADER,
            scoutNumber: '00000002',
            status: 'APPROVED',
        },
    });

    console.log('✅ Group Leader created:', groupLeader.email);

    // 3. Create Section Leaders
    const sectionLeaders = [
        {
            name: 'Chefe Lobitos',
            email: 'lobitos@agrupamento1066.pt',
            section: Section.LOBITOS,
            scoutNumber: '00000010',
            label: 'Seccao I'
        },
        {
            name: 'Chefe Exploradores',
            email: 'exploradores@agrupamento1066.pt',
            section: Section.EXPLORADORES,
            scoutNumber: '00000011',
            label: 'Seccao II'
        },
        {
            name: 'Chefe Pioneiros',
            email: 'pioneiros@agrupamento1066.pt',
            section: Section.PIONEIROS,
            scoutNumber: '00000012',
            label: 'Seccao III'
        },
        {
            name: 'Chefe Caminheiros',
            email: 'caminheiros@agrupamento1066.pt',
            section: Section.CAMINHEIROS,
            scoutNumber: '00000013',
            label: 'Seccao IV'
        },
    ];

    for (const leader of sectionLeaders) {
        const hashedPwd = await bcrypt.hash('leader123', 10);
        await prisma.user.upsert({
            where: { email: leader.email },
            update: {
                managedSection: leader.section,
            },
            create: {
                name: leader.name,
                email: leader.email,
                password: hashedPwd,
                role: Role.SECTION_LEADER,
                scoutNumber: leader.scoutNumber,
                managedSection: leader.section,
                status: 'APPROVED',
            },
        });
        console.log(`✅ Section Leader created: ${leader.name} (${leader.label})`);
    }

    // 4. Create Sample Scout
    const scoutPassword = await bcrypt.hash('scout123', 10);
    const scout = await prisma.user.upsert({
        where: { email: 'scout@example.com' },
        update: {},
        create: {
            name: 'João Silva',
            email: 'scout@example.com',
            password: scoutPassword,
            role: Role.SCOUT,
            scoutNumber: '12345678',
            status: 'APPROVED',
            scoutInfo: {
                create: {
                    birthDate: new Date('2010-05-15'),
                    section: Section.EXPLORADORES,
                    team: 'Patrulha Águia',
                    fieldNights: 12,
                },
            },
        },
    });

    console.log('✅ Sample Scout created:', scout.email);

    // 5. Create Inventory Items
    console.log('📦 Seeding inventory...');
    const inventoryItems = [
        { name: 'Tenda 4 Pessoas', category: 'CAMPING', quantity: 8, minQuantity: 2, description: 'Tenda familiar em bom estado' },
        { name: 'Fogareiro Gás', category: 'KITCHEN', quantity: 5, minQuantity: 1, description: 'Campingaz standard' },
        { name: 'Mala Primeiros Socorros', category: 'OTHER', quantity: 4, minQuantity: 2, description: 'Kit completo de emergência' },
        { name: 'Camisa Escuteiro (S)', category: 'UNIFORM', quantity: 3, minQuantity: 1, size: 'S' },
        { name: 'Camisa Escuteiro (M)', category: 'UNIFORM', quantity: 5, minQuantity: 1, size: 'M' },
        { name: 'Lenço de Agrupamento', category: 'UNIFORM', quantity: 15, minQuantity: 5 },
        { name: 'Calções (T40)', category: 'UNIFORM', quantity: 2, minQuantity: 1, size: '40' },
        { name: 'Livro do Lobito', category: 'LITERATURE', quantity: 10, minQuantity: 2, description: 'Guia oficial para a I Secção' },
        { name: 'Caderno de Caça', category: 'LITERATURE', quantity: 20, minQuantity: 5, description: 'Para registo de atividades' },
        { name: 'Caneca 1066', category: 'GIFTS', quantity: 12, minQuantity: 3, description: 'Caneca personalizada do agrupamento' },
        { name: 'Porta-chaves Nó de Águia', category: 'GIFTS', quantity: 25, minQuantity: 5 },
    ];

    for (const item of inventoryItems) {
        await prisma.inventoryItem.upsert({
            where: { id: `seed-${item.name.replace(/\s+/g, '-').toLowerCase()}` },
            update: item,
            create: {
                id: `seed-${item.name.replace(/\s+/g, '-').toLowerCase()}`,
                ...item
            },
        });
    }

    // 6. Create Events
    console.log('📅 Seeding events...');
    const events = [
        { title: 'Acampamento de Primavera', startDate: new Date('2025-04-10'), endDate: new Date('2025-04-13'), location: 'Sintra' },
        { title: 'Caminhada de Secção', startDate: new Date('2025-03-22'), location: 'Monsanto', section: Section.EXPLORADORES },
        { title: 'Conselho de Guias', startDate: new Date('2025-03-01'), location: 'Sede' },
    ];

    for (const event of events) {
        await prisma.event.create({
            data: event
        });
    }

    console.log('\n📝 Login credentials:');
    console.log('Super Admin: dev@agrupamento1066.pt / superadmin123');
    console.log('Group Leader: admin@agrupamento1066.pt / admin123');
    console.log('Section Leaders: [section]@agrupamento1066.pt / leader123');
    console.log('  - lobitos@agrupamento1066.pt (Seccao I)');
    console.log('  - exploradores@agrupamento1066.pt (Seccao II)');
    console.log('  - pioneiros@agrupamento1066.pt (Seccao III)');
    console.log('  - caminheiros@agrupamento1066.pt (Seccao IV)');
    console.log('Scout: scout@example.com / scout123');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
